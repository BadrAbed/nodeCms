var express = require('express');
var router = express.Router();
var express_handlebars_sections = require('express-handlebars-sections');
// layout = require('express-layout');
// app = express();
//
// app.use(layout());
/* GET home page. */
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='home';
    next();
});
var express_handlebars_sections = require('express-handlebars-sections');
router.get('/home', function (req, res, next) {
    res.render('home/index', {
        title: 'Express',
        layout: 'home',
        section: express_handlebars_sections(),
        partialsDir: __dirname + '/views/partials/'
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
    res.render('home/auth/login', {
        title: 'Express',
        layout: 'home',
        section: express_handlebars_sections(),
        partialsDir: __dirname + '/views/partials/'
    });
});
router.get('/register', function (req, res, next) {
    res.render('home/auth/register', {
        title: 'Express',
        layout: 'home',
        section: express_handlebars_sections(),
        partialsDir: __dirname + '/views/partials/'
    });
});
module.exports = router;
