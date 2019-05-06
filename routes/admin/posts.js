var express = require('express');
var router = express.Router();
const postsController = require('../../controllers/postsController');
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', function (req, res, next) {
    res.render('admin/posts');

});
router.get('/create', function (req, res, next) {
    res.render('admin/posts/create');

});
router.post('/create', function (req, res, next) {
   // console.log(req.body);
  postsController.AddPost(req.body.title, req.body.status, req.body.allowComments, req.body.post);
    res.render('admin/posts/create');

});


module.exports = router;