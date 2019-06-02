var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = mongoose.model('comments', {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    body: {
        type: String,
        require: {
            value: true,
            message: 'الكومنت  مطلوب'
        },
    },
    childern_comment_id: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Comment;