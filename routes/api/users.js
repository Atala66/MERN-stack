const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

// @route       POST api/users
// @descrition  Register/ Create new user && return token
// @access      Public
router.post('/', [
        // check if valid body
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Password is required, Min Length: 6').isLength({
            min: 6
        })
    ],
    async(req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        // if errors
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        } // end errors check

        const { name, email, password } = req.body;
        try {
            // search user by email
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists'
                    }]
                });
            }
            const avatarOptions = { s: '200', r: 'pg', d: 'mm' };
            const avatar = gravatar.url(email, avatarOptions);
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password
            const salt = await bCrypt.genSalt(10);
            user.password = await bCrypt.hash(password, salt);
            // Save user to the DB and returns a promise
            await user.save();
            // Return jwt token to client
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, config.get('jwtToken'), { expiresIn: 360000 },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                })
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }


    });


module.exports = router;