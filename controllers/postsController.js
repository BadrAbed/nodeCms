const Post = require('../models/Post');
const fs = require('fs');
var upload_helper = require('../helpers/upload-helper');
exports.AddPost = function (files, title, status, allowComments, body, category) {
    let fileName = "";
    if (!upload_helper.isEmpty(files)) {
        fileName = Date.now() + '_' + files.file.name;
        files.file.mv(`../public/uploads/${fileName}`, err => {
            if (err) throw  err;
        });

    }
    if (allowComments === "true") {
        allowComments = true;
    }
    else {
        allowComments = false;

    }
    const newPost = new Post({
        title: title,
        allowComments: allowComments,
        status: status,
        body: body,
        file: fileName,
        category: category,
    });
    return newPost.save()
        .then(res => {
            return res;
        })
        .catch(err => {

            return err;
        });
};
exports.allPosts = function () {

    return Post.find({}).populate({path: 'comments', populate: {path: 'user'}}).populate('category').then(res => {
        return res;
    }).catch(err => {
        return err;
    });

};
exports.EditPost = function (id, title, status, allowComments, body, files, category) {
    if (allowComments === "true") {
        allowComments = true;
    }
    else {
        allowComments = false;

    }

    Post.findOne({_id: id}).then(res => {
        res.title = title;
        res.status = status;
        res.category = category;
        res.allowComments = allowComments;
        res.body = body;
        if (!upload_helper.isEmpty(files)) {

            let fileName = Date.now() + '_' + files.file.name;
            files.file.mv(`../public/uploads/${fileName}`, err => {
                if (err) throw  err;
            });
            res.file = fileName;
        }
        res.save().then(result => {
            console.log(result)
        });

    }).catch(err => {
        console.log(err)
    });
};

exports.DeletePost = function (id) {
    Post.findByIdAndDelete({_id: id}).populate('comments').then(res => {
        console.log(res);
        fs.unlink(upload_helper.uploadDir + res.file, (err) => {
            res.comments.forEach(comment => {
                comment.remove();
            });
            console.log(err)
        });
    }).catch(err => {
    });
}