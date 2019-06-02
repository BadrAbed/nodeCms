const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = mongoose.model('posts', {
    user: {},
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    title: {
        type: String,
        required: {
            values: true,
            message: 'العنوان مطلوب'
        },
        minLength: 3,
        trim: true,
    },
    status: {
        type: String,
        required: {
            values: true,
            message: 'الحالة مطلوبة'
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
            values: true,
            message: 'الوصف مطلوب'
        },
        minLength: 40,
        trim: true,
    }
    , file:
        {
            type: String,
        },

    date: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]


});

module.exports = Post;
