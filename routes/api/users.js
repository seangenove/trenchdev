const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please inclide a valid email').isEmail(),
    check(
        'password',
        'Pelase enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
],
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists' } ] })
        }

        console.log('before');

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        console.log('after');

        user = new User({name, email, avatar, password});

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken

        res.send('User registered')

    } catch(err) {
        console.error(err);
        res.status(500).send('Server error ');
    }
});

module.exports = router;