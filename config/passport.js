// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model



var bCrypt = require('bcrypt-nodejs');
 
 
module.exports = function(passport, user) {
    
 
    var User = user;

    console.log("User: "+User);
 
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });

    passport.deserializeUser(function(id, done) {
 
    console.log("passport deserializeUser"); 
    console.log("User: "+user);
    console.log("id: " +id);
    User.findById(id).then(function(user) {
 
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
 
        });
     
    });
 
 
    passport.use('local-signup', new LocalStrategy(
        
    
 
        function(userName, passWord, done) {
            console.log("made it to local-signup");

            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
            };
            
            console.log("username: " +userName);
            console.log("password: "+ passWord)
            console.log("done: "+done);
 
            User.findOne({
                where: {
                    username: userName
                }
            }).then(function(user) {
                
                if (user)
                    
                {
                    console.log("If user: " + user)
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
 
                } else
 
                {
                    

                    var userPassword = generateHash(userName);
                    console.log("encrypted password: " + userPassword);
                    var data =
 
                        {

                            username: userName,
 
                            password: userPassword                       
 
                        };
                    console.log(data);
                    User.create(data).then(function(newUser, created) {
                        
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

    passport.use('local-signin',new LocalStrategy(

      function(username, password, done) {
        console.log("username: "+username);
        console.log("password: "+ password);
        console.log("done: "+ done);
 
        var User = user;
 
        var isValidPassword = function(userpass, password) {
            console.log(bCrypt.compareSync(password, userpass))
            return bCrypt.compareSync(password, userpass);
 
        }
 
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'username does not exist'
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
 
            var userinfo = user.get();
            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
    }));
 
}