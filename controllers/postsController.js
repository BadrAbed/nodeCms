const Posts = require('../models/Post');

exports.AddPost = function (title, status, allowComments, body) {
    if (allowComments === "true") {
        allowComments = true;
    }
    else {
        allowComments = false;

    }

    const newPost = new Posts({
        title: title,
        allowComments: allowComments,
        status: status,
        body: body,
    });
    newPost.save();
};