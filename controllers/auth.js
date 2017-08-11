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


    
    
    app.get("/challenge", isLoggedIn, authController.challenge);

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.post('/logout',authController.logout);


    //api routes
    // get all challenges by user id
    app.get("/api/user/:id", isLoggedIn, authController.userchallenges); 

    //create new user
    app.post("/api/user/new", isLoggedIn, authController.createUser);

    // get challenge by id and get all users and scores
    app.get("/api/challenge/:id", isLoggedIn, authController.challegeID);

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


    function createCode() {
      var code = "";
      var alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 4; i++)
        code += alphanum.charAt(Math.floor(Math.random() * alphanum.length));

      return code;
    }

    // TODO: finish this and add to score update api calls
    // update winner_id everytime score is added/changed
    function updateWinner(id) {
        db.Score.findAll({
            where: {
                challenge_id: id
            }
        }).then(function(scores) {

        });
    }
 
}
 
}