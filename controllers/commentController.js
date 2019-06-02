var Post = require('../models/Post');
var Comment = require('../models/Comments');

module.exports = {
    addComment: function (comment, post_id, user_id) {
        Post.findById({_id: post_id}).then(post => {
            newComment = new Comment;
            newComment.body = comment;
            newComment.user = user_id;
            newComment.save().then(res => {
                post.comments.push(newComment);
                post.save().then(po => {

                });
            });
        })

    },
    deleteComment: function (comment_id) {
        Post.findOneAndUpdate({comments: comment_id}, {
            $pull: {
                comments: comment_id
            }
        }).then(post => {
            Comment.findByIdAndRemove({_id: comment_id}).then(comment => {

            })
        })
    },
    reply: function (parent_comment_id, comment, user_id) {

        Comment.findById({_id: parent_comment_id}).then(parcomment => {

            newComment = new Comment;
            newComment.body = comment;
            newComment.user = user_id;
            newComment.save().then(res => {
                parcomment.childern_comment_id.push(newComment);
                parcomment.save().then(done => {

                });
            })
        })
    }

}