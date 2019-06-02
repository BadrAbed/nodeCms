var express = require('express');

var router = express.Router();
var express_handlebars_sections = require('express-handlebars-sections');
var post = require('../../models/Post');
var categoryController = require('../../controllers/categoryController');
var userController = require('../../controllers/userController');

// layout = require('express-layout');
// app = express();
//
// app.use(layout());
/* GET home page. */
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});
userController.login();
var express_handlebars_sections = require('express-handlebars-sections');
router.get('/home', function (req, res, next) {
    post.find({}).then(posts => {
        categoryController.allCategories().then(Categories => {
            res.render('home/index', {
                title: 'Express',
                layout: 'home',
                section: express_handlebars_sections(),
                partialsDir: __dirname + '/views/partials/',
                posts: posts,
                Categories: Categories,
                pagination: {
                    page: 3,
                    pageCount: 10
                }
            });
        });

    });


});
router.get('/about', function (req, res, next) {
    res.render('home/about', {
        title: 'Express',
        layout: 'home',
        section: express_handlebars_sections(),
        partialsDir: __dirname + '/views/partials/'
    });
});
router.get('/login', function (req, res, next) {
    if(!req.isAuthenticated()){
        res.render('home/auth/login', {
            title: 'Express',
            layout: 'home',
            section: express_handlebars_sections(),
            partialsDir: __dirname + '/views/partials/'
        });
    }
  else{
        res.redirect('back')
    }
});
router.post('/login', function (req, res, next) {

    userController.userRedirect(req, res, next);
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/main/login');
});
router.get('/register', function (req, res, next) {
    res.render('home/auth/register', {
        title: 'Express',
        layout: 'home',
        section: express_handlebars_sections(),
        partialsDir: __dirname + '/views/partials/'
    });
});
router.post('/register', function (req, res, next) {
    console.log(req.body.email)
    let errors = {};
    if (req.body.password !== req.body.passwordConfirm) {
        errors.message = 'كلمة المرور غير متطابقة ';

        res.render('home/auth/register', {errors: errors});
    }
    else {
        userController.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password).then(user => {
            if (user.errors) {

                res.render('home/auth/register', {errors: user.errors});
            }
            else {
                req.flash('success', 'تم التسجيل بنجاح');
                res.redirect('/main/register');
            }
        });

    }


});
router.get('/singlePost/:id', (req, res, next) => {
    post.findOne({_id: req.params.id}).populate({path: 'comments', populate: {path: 'user'}}).populate({path: 'comments', populate: {path: 'childern_comment_id',populate:{path:'user'}}}).then(result => {
        console.log(result.comments);
        categoryController.allCategories().then(Categories => {

            res.render('home/post', {post: result, Categories: Categories});
        });

    }).catch(err => {
        console.log(err);
    });
});
module.exports = router;
