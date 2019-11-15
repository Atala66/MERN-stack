const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator/check');

// @route       GET api/profile/me
// @descrition  get current user profile
// @access      Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route       POST api/profile
// @descrition  create || update user profile
// @access      Private
router.post('/', [
        auth, [
            check('status', 'Status is required').not().isEmpty()
            //  check('skills', 'Skills are required').not().isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // if is Valid post build profile object
        const { company, website, location, bio, status, githubusername, skills, youtube, linkedin, twitter, facebook, instagram } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        // single data
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        // array data
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        console.log(profileFields.skills);
        res.send('Hello');
    });

module.exports = router;