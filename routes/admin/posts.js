var express = require('express');
var router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'layout';
    next();
});

router.get('/', function (req, res, next) {
    res.send('admin/posts');

});
router.get('/create', function (req, res, next) {
    res.send('admin/posts/create');

});


module.exports = router;