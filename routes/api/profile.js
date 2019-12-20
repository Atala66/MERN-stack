const express = require('express');
const request = require('request')
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
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
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills are required').not().isEmpty()
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
        // build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            // update (profile exists)
            if (profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }
            // create new Profile
            profile = new Profile(profileFields);
            // console.log('new profile::', profile);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Create profile failed');
        }

    });

// @route       GET api/profile
// @descrition  Get all profiles
// @access      Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Get all profiles failed');
    }
});

// @route       GET api/profile/user/:user_id
// @descrition  Get all profiles
// @access      Public
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile por this user' });
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        // error porque el objeto id no es válido y no por el server
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid user id' });
        }
        return res.status(500).send('Get profile by id failed');
    }
});

// @route       DELETE api/profile
// @descrition  Delete user && profile
// @access      Private
router.delete('/', auth, async(req, res) => {
    try {
        // remove posts
        await Post.deleteMany({ user: req.user.id });
        // remove profile
        await Profile.findOneAndDelete({ user: req.user.id });
        // remove user
        await User.findOneAndDelete({ _id: req.user.id });
        res.json({ msg: 'User succesfully deleted' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Get all profiles failed');
    }
});

// @route       PUT api/profile/experience
// @descrition  update user´s profile experience
// @access      Private
router.put('/experience', [
        auth, [
            check('title', 'Title of the job is required').not().isEmpty(),
            check('company', 'Company name is required').not().isEmpty(),
            check('location', 'Job location is required').not().isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { title, company, location, from, to, current, description } = req.body;
        // create experience object
        const newExperience = {
            title: title,
            company: company,
            location: location,
            from: from,
            to: to,
            current: current,
            description: description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            //agrega uno o más elementos al inicio del array, y devuelve la nueva longitud 
            profile.experience.unshift(newExperience);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Update user´s experience failed');
        }
    });

// @route       DELETE api/profile/experience/:exp_id
// @descrition  delete specific experience from  user´s profile
// @access      Private
router.delete('/experience/:exp_id', auth,
    async(req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            // get removed index
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
            profile.experience.splice(removeIndex, 1);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Deleting user´s experience failed');
        }
    });


// @route       PUT api/profile/education
// @descrition  update user´s profile education
// @access      Private
router.put('/education', [
        auth, [
            check('school', 'School name is required').not().isEmpty(),
            check('degree', 'Degree name is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('current', 'Current is required').not().isEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { school, degree, fieldofstudy, from, to, current, description } = req.body;
        const newEducation = {
            school: school,
            degree: degree,
            fieldofstudy: fieldofstudy,
            from: from,
            to: to,
            current: current,
            description: description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEducation);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Update user´s education failed');
        }
    });

// @route       DELETE api/profile/education/:education_id
// @descrition  delete specific education from  user´s profile
// @access      Private
router.delete('/education/:education_id', auth,
    async(req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            // get removed index
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id);
            profile.education.splice(removeIndex, 1);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Deleting user´s education failed');
        }
    });

// @route       GET api/profile/github/:githubusername
// @descrition  get users repos from github
// @access      Public
router.get('/github/:githubusername', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.githubusername}
        /repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}
        &client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github profile founded' });
            }
            res.json(JSON.parse(body));
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Get github profile failed');
    }
});


module.exports = router;