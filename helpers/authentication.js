module.exports = {
    userAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(req.user.email);
            if (req.user.email === "editor@editor.net") {
                next();
            }
            else{
                res.redirect('/main/home');
            }

        }
        else {
            res.redirect('/main/login');
        }
    }
}