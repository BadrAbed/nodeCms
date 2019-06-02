var User = require('../models/User');
var passwordHash = require('password-hash');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
module.exports = {

    addUser: function (firstName, lastName, email, password) {
        const newUser = new User;

        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        let hashedPassword = passwordHash.generate(password);
        newUser.password = hashedPassword;
        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(password, salt, (err, hash) => {
        //
        //         newUser.password = hash;
        //
        //     })
        // });
        console.log(newUser);
        return newUser.save()
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });

    },
    login: function () {
        passport.use(new passportLocal({usernameField: 'email'}, (email, password, done) => {
            User.findOne({email: email}).then(user => {
                //  user.test();
                if (!user) return done(null, false, {message: 'no user found'});

                if(user){
                    if (!passwordHash.verify(password, user.password)) {
                        return done(null, false, {message: 'Incorrect password'});
                    }
                    else{
                        return done(null, user);
                    }


                }
                // if(!user.validPassword()) return done(null,false,{message:'no user found'})
            })
        }));

        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done){
            User.findById(id, function(err, user){
                done(err, user);
            });
        });
        // passport.authenticate('local', {
        //     successRedirect: '/admin',
        //     failureRedirect: '/login',
        //     failureFlash: true,
        // })
    },
    userRedirect: function (req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/main/login',
            failureFlash: true,
        })(req, res, next)
    }
}
