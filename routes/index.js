var express = require('express');
var router = express.Router();
var express_handlebars_sections = require('express-handlebars-sections');
// layout = require('express-layout');
// app = express();
//
// app.use(layout());
/* GET home page. */
var express_handlebars_sections = require('express-handlebars-sections');
router.get('/', function (req, res, next) {
    res.redirect('main/home');
});

module.exports = router;
