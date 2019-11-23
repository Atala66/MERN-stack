const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // reference to user model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String,
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean
        },
        description: {
            type: String,
        }
    }],
    education: [{
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                required: true
            },
            description: {
                type: String
            }
        }

    ],
    social: {
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = profile = mongoose.model('profile', profileSchema);