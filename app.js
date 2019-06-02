var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var body_parser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express_handlebars_sections = require('express-handlebars-sections');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeMainRouter = require('./routes/home/main');
var adminRouter = require('./routes/admin/admin');
var adminPostsRouter = require('./routes/admin/posts');
var adminCategoriesRouter = require('./routes/admin/Categories');
var comments = require('./routes/admin/comment');
var hbs = require('express-handlebars');
var layouts = require('handlebars-layouts');
var select = require('./helpers/handlebars');
var methodOverride = require('method-override');
var connectTodataBase = require('./../cms/helpers/connectToDB');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
hbs.create(layouts(hbs));


var paginate = require('handlebars-paginate');
//var exhb = hbs.create({ extname: 'hbs' });
var app = express();
//hbsHelpers.register(exhb.handlebars, {});
// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    section: express_handlebars_sections(),
    partialsDir: __dirname + '/views/partials/',
    helpers: {select: select.select, ifEquals: select.ifEquals, time: select.time,getCommentedUser:select.getCommentedUser,paginate:paginate}
}));
//app.engine('html', exhb.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {layout: __dirname + '/views/layouts/layout'});
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
    //   cookie: {secure: true}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.user = req.user || null;
    res.locals.error = req.flash('error') ;
    next();
});
// app.use(function () {
//     connectTodataBase
// });
app.use(fileUpload());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', homeMainRouter);
app.use('/admin', adminRouter);
app.use('/admin/posts', adminPostsRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/comment', comments);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
