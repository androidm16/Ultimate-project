const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null,
    },
    about: {
        type: String,
        required: false,
        default: null,
      },
      joinDate: {
        type: Date,
        required: true,
        default: Date.now,
      },

});

module.exports = mongoose.model('users', userSchema)