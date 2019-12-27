const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator/check');

// @route       POST api/posts
// @descrition  Create new post
// @access      Private
router.post('/', [
        auth, [
            check('text', 'Text is required').not().isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                id: req.user.id,
                user: req.user.id
            })
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('New post failed');
        }
    }
);

// @route       GET api/posts
// @descrition  Get all posts
// @access      Private
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }) // newest posts first
        res.json(posts);
        // console.log('posts', posts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Get all posts failed');
    }

});

// @route       GET api/posts/:id
// @descrition  Get a post by id
// @access      Private
router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid post id' });
        }
        res.status(500).send('Get post by id failed');
    }
});

// @route       DELETE api/posts/:id
// @descrition  Delete a post by id
// @access      Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post.user);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid post id' });
        }
        res.status(500).send('Delete post failed');
    }
});


// // @route       PUT api/posts/like/:id
// // @descrition  Like a post
// // @access      Private
router.put('/like/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // check post has already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        await post.save();
        res.json(post.likes);
    } catch (err) {
        res.status(500).send('Like post failed');
    }

});
// // @route       PUT api/posts/unlike/:id
// // @descrition  Unlike a post
// // @access      Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // check post has already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        }
        // get removed index
        const removedIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removedIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        res.status(500).send('Unlike post failed');
    }

});


// @route       POST api/posts/comment/:id
// @descrition  Add a comment to a post
// @access      Private
router.post('/comment/:id', [
        auth, [
            check('text', 'Text is required').not().isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.log(err.message);
            res.status(500).send(' Add New comment failed');
        }
    }
);

// @route       POST api/posts/comment/:id/:comment_id
// @descrition  Add a comment to a post
// @access      Private
router.delete('/comment/:id/comment_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // extract comment
        const comment = posts.find(comment => comment.id === req.params.comment._id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment  not found' });
        }
        post.comment.splice(comment, 1);
        await post.remove();
        res.json(post.comments);
        res.json({ msg: 'Comment  removed' });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('New comment failed');
    }
});


module.exports = router;