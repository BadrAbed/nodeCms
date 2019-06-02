var express = require('express');
var router = express.Router();
var faker = require('faker');
var moment = require('moment');
const Post = require('../../models/Post');
const postsController = require('../../controllers/postsController');
var categoryController = require('../../controllers/categoryController');
var authHelper = require('../../helpers/authentication');

router.all('/*',authHelper.userAuthicated, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();
});

router.get('/', function (req, res, next) {
    let allPosts;
    allPosts = postsController.allPosts();
    allPosts.then(allPosts => {
        categoryController.allCategories().then(Categories => {

            res.render('admin/posts', {Posts:allPosts,Categories:Categories});

        });

    });


});
router.get('/create', function (req, res, next) {
    categoryController.allCategories().then(Categories => {
        res.render('admin/posts/create', {Categories: Categories});
    })


});
router.post('/create', function (req, res, next) {
    // console.log(req.body);
    // console.log(req.files.file);
//     let errors = [];
//     if (!req.body.title) {
//         errors.push({message: "please add title"});
//     }
//     if (errors.length > 0) {
//         res.render('admin/posts/create', {errors: errors});
//     }
// else{
    let newPost = postsController.AddPost(req.files, req.body.title, req.body.status, req.body.allowComments, req.body.post, req.body.category);

    newPost.then(result => {
        if (result.errors) {
            res.render('admin/posts/create', {errors: result.errors});
        }
        else {
            req.flash('success', 'تمت الاضافة بنجاح');
            res.redirect('/admin/posts');
        }


    }).catch(err => {
        console.log(err);
    });


    // }


});

router.put('/edit/:id', function (req, res, next) {
    // console.log(req.body);

    postsController.EditPost(req.params.id, req.body.title, req.body.status, req.body.allowComments, req.body.post, req.files,req.body.category);
    req.flash('success', 'تم التعديل بنجاح');
    res.redirect('/admin/posts');

});
router.get('/delete/:id', function (req, res, next) {
    // console.log(req.body);
    req.flash('success', 'تم المسح بنجاح');
    postsController.DeletePost(req.params.id);
    res.redirect('/admin/posts');

});
router.post('/generate-fake-posts', function (req, res, next) {
    for (let i = 0; i < req.body.amount; i++) {
        let post = new Post({
            title: faker.name.title(),
            allowComments: faker.random.boolean(),
            status: "public",
            body: faker.lorem.sentence(),
        });
        post.save();
    }

    res.redirect('/admin/posts');

});

module.exports = router;