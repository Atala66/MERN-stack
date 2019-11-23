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
        profileFields.socials = {};
        if (youtube) profileFields.socials.youtube = youtube;
        if (linkedin) profileFields.socials.linkedin = linkedin;
        if (twitter) profileFields.socials.twitter = twitter;
        if (facebook) profileFields.socials.facebook = facebook;
        if (instagram) profileFields.socials.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            // update (profile exists)
            if (profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }
            // create new Profile
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Create/update profile failed');
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

// @ TODO - EDUCATION


module.exports = router;