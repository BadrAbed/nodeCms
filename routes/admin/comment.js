var Express = require('express');
var router = Express.Router();
var commentController = require('../../controllers/commentController');

router.post('/save/:post_id', (req, res, next) => {
    commentController.addComment(req.body.comment, req.params.post_id, req.user.id);
    res.redirect(`/main/singlePost/${req.params.post_id}`)
});
router.get('/delete/:comment_id', (req, res, next) => {
    commentController.deleteComment(req.params.comment_id,);
    res.redirect('back');
});
router.post('/reply/:parent_comment_id', (req, res, next) => {
    commentController.reply(req.params.parent_comment_id, req.body.replycomment, req.user.id);
    res.redirect('back');
});


module.exports = router;