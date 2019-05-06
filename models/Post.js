const mongoose = require('mongoose');
require('./../helpers/connectToDB');
const User = mongoose.model('posts', {
    user: {},
    title: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    allowComments: {
        type:Boolean ,

        minLength: 3,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        minLength: 40,
        trim: true,
    }


});

module.exports = User;
