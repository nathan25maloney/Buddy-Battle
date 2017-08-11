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


    
    
    app.get("/challenge/:id", isLoggedIn, authController.challenge);

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.post('/logout',authController.logout);

    //api routes

    // create new challenge
    app.post("/api/challenge/new", isLoggedIn, authController.newChallenge);

    // join existing challenge
    app.post("/api/challenge/join", isLoggedIn, authController.joinChallenge);

    // create/update score
    app.post("/api/challenge/:id/score", isLoggedIn, authController.createUpdateScore);





    function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/signin');
 
}
 
}