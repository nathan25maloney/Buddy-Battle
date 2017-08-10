// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model



var bCrypt = require('bcrypt-nodejs');
 
 
module.exports = function(passport, user) {
    
 
    var User = user;
 
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });

    passport.deserializeUser(function(id, done) {
 
    console.log("passport deserializeUser"); 
    User.findById(id).then(function(user) {
 
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
 
        });
     
    });
 
 
    passport.use('local-signup', new LocalStrategy(
        
        {
 
            usernameField: 'userName',
 
            passwordField: 'password',
 
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        },
 
    
 
        function(req, userName, password, done) {
            console.log("made it to local-signup");
            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
            };
 
            console.log(userName);
 
            User.findOne({
                where: {
                    username: userName
                }
            }).then(function(user) {
 
                if (user)
 
                {
 
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
 
                } else
 
                {
 
                    var userPassword = generateHash(password);
 
                    var data =
 
                        {
                            name: req.body.name,

                            username: userName,
 
                            password: userPassword                       
 
                        };
 
                    User.create(data).then(function(newUser, created) {
                        console.log(data);
                        if (!newUser) {
 
                            return done(null, false);
 
                        }
 
                        if (newUser) {
 
                            return done(null, newUser);
 
                        }
 
                    });
 
                }
 
            });
 
        }
 
    ));
 
}