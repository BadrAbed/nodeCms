const mongoose = require('mongoose');

const User = mongoose.model('posts', {
    user: {},
    title: {
        type: String,
        required: {
            values:true,
            message:'العنوان مطلوب'
        },
        minLength: 3,
        trim: true,
    },
    status: {
        type: String,
        required: {
            values:true,
            message:'الحالة مطلوبة'
        },
        minLength: 3,
        trim: true,
    },
    allowComments: {
        type: Boolean,

        minLength: 3,
        trim: true,
    },
    body: {
        type: String,
        required: {
            values:true,
            message:'الوصف مطلوب'
        },
        minLength: 40,
        trim: true,
    }
    , file:
        {
            type: String,
        }


});

module.exports = User;
