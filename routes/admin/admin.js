var express = require('express');
var router = express.Router();
var authHelper = require('../../helpers/authentication');

router.all('/*',authHelper.userAuthicated, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();
});

router.get('/', function (req, res, next) {
    res.render('admin/index');

});
router.get('/dashboard', function (req, res, next) {
    res.render('admin/dashboard');

});



module.exports = router;
