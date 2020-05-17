const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        if (!posts) {
            return res.status(404).send({ msg: 'No posts found' })
        }

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post('/', [
    auth,
    check('text', 'text is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

// @route   POST api/posts/:id
// @desc    Delete post by id
// @access  Private
router.post('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'Unauthorized' })
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' })
        }

        const isLiked = post.likes.filter(like => like.user.toString() === req.user.id).length > 0

        if (isLiked) {
            return res.status(400).send({ msg: 'Post already liked ' })
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

// @route   POST api/posts/unlike/:id
// @desc    Like a post
// @access  Private
router.post('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' })
        }

        const isLiked = post.likes.filter(like => like.user.toString() === req.user.id).length === 0

        if (isLiked) {
            return res.status(400).send({ msg: 'Post has not yet been liked ' })
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', [
    auth,
    check('text', 'text is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' })
        }

        const user = await User.findById(req.user.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

// @route   POST api/posts/comment/:post_id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.post('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.comment_id);

        if (removeIndex === -1) {
            return res.status(404).send({ msg: 'Comment not found' });
        }

        if (post.comments[removeIndex].user.toString() === req.user.id ||  // owner of comment
            post.user.toString() === req.user.id) {  // owner of post
            post.comments.splice(removeIndex, 1);

            await post.save();

            res.json(post.comments);
        } else {
            return res.status(401).send({ msg: 'Unauthorized' })
        }

    } catch (err) {
        console.error(err.message);

        if (err.name == 'CastError') {
            return res.status(404).send({ msg: 'Post not found' })
        }

        res.status(500).send('Server error');
    }
});

module.exports = router;