var express = require('express');
var router = express.Router();

router.all('/*', (req, res, next) => {
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
