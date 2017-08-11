var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);

    app.get('/', isLoggedIn, authController.dashboard);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signin'
        }
        
 
    ));

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
        
 
    ));

    app.get("/api/user/:id", isLoggedIn, authcontroller.userchallenges); 
    
    app.get("/challenge", isLoggedIn, authcontroller.challenge);

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout)


    function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/signin');
 
}
 
}