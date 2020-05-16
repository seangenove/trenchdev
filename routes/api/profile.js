const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'No profile for this user' })
        }

        res.json(profile);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])

        res.json(profiles);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [
    auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const profileFields = parseProfileData(req);

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err);

        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server error');
    }

});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove user's posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

// @route   POST api/profile/experience
// @desc    Add profile experience
// @access  Private
router.post('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }

        const { title, company, location, from, to, current, description } = req.body;
        const newExp = { title, company, location, from, to, current, description };

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile/education
// @desc    Add profile education
// @access  Private
router.post('/education', [auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }

        const { school, degree, fieldOfStudy, from, to, current, description } = req.body;
        const newEduc = { school, degree, fieldOfStudy, from, to, current, description };

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEduc);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/education/:educ_id
// @desc    Delete profile education
// @access  Private
router.delete('/education/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.educ_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const url = `https://api.github.com/users/${req.params.username}/repos?per_page=5
            &sort=created:asc&client_id=${config.get('githubClientId')}&clientSecret=${config.get('githubSecret')}`;

        await axios({
            method: 'get',
            url,
            headers: { 'user-agent': 'node.js' }
        }).then(({ data }) => {
            res.json(data);
        }).catch((err) => {
            // handle error
            console.error(err);

            return res.status(404).json({ msg: 'No Github profile found' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

const parseProfileData = (req) => {
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        social: {
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: ''
        }
    };
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    return profileFields;
};

module.exports = router;