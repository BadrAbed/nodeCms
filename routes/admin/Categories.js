const express = require('express');
const router = express.Router();
var categoryController = require('../../controllers/categoryController');

var authHelper = require('../../helpers/authentication');

router.all('/*',authHelper.userAuthicated, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();
});
router.get('/', (req, res, next) => {
    categoryController.allCategories().then(result => {
        res.render('admin/categories/index', {Categories: result});
    })

});
router.post('/create', (req, res, next) => {
    categoryController.save(req.body.name);
    req.flash('success', 'تمت الاضافة بنجاح');
    res.redirect('/admin/categories')
});
router.get('/delete/:id', (req, res, next) => {

    categoryController.deleteCate(req.params.id);
    req.flash('success', 'تم الحذف بنجاح');
    res.redirect('/admin/categories')
});
router.put('/edit/:id', (req, res, next) => {

    categoryController.editCate(req.params.id, req.body.name);
    req.flash('success', 'تم التعديل بنجاح');
    res.redirect('/admin/categories')
});

module.exports = router;