const Post = require('../models/Post');
const fs = require('fs');
var upload_helper = require('../helpers/upload-helper');
exports.AddPost = function (files, title, status, allowComments, body) {
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
    });
    return  newPost.save()
        .then(res => {
            return res;
        })
        .catch(err => {

            return err;
        });
};
exports.allPosts = function () {

    return Post.find({}).then(res => {
        return res;
    }).catch(err => {
        return err;
    });

};
exports.EditPost = function (id, title, status, allowComments, body) {
    if (allowComments === "true") {
        allowComments = true;
    }
    else {
        allowComments = false;

    }

    Post.update({_id: id}, {
        $set: {
            title: title,
            allowComments: allowComments,
            status: status,
            body: body,
        }
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
};

exports.DeletePost = function (id) {
    Post.findByIdAndDelete({_id: id}).then(res => {
        console.log(res);
        fs.unlink(upload_helper.uploadDir + res.file, (err) => {
            console.log(err)
        });
    }).catch(err => {
    });
}