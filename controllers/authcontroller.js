var db = require('../models')


var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup', { user : req.user });
 
}

exports.signin = function(req, res) {
 
    res.render('signin', { user : req.user });
 
}

exports.dashboard = function(req,res) {
	// find user by id
    db.User.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        // get all challenges and scores
        db.Challenge.findAll({}).then(function(challenges) {
            let context = {
                user: req.user,
                challenges: challenges
            };
            console.log("Context for /dashboard:",context);
            res.render('dashboard', context);
        });
    });
}

exports.challenge = function(req,res) {
    // find challenge by id
    db.Challenge.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(challenge) {
        // get all users and scores
        challenge.getUsers().then(function(users) {
            let context = {
                user: req.user,
                challenge,
                users: users
            };
            console.log("Context for /challenge:",context);
            res.render('challenge', context);
        });
    });
	
}

exports.newChallenge = function(req, res) {
        // find user
        console.log("find user");
        db.User.findOne({
            where: {
                id: req.user.id
            }
        }).then(function(user) {
            // create challenge
            console.log("user: " + user);
            console.log("req: " + req);

            db.Challenge.create({
                name: req.body.name,
                description: req.body.description,
                measurement: req.body.metric,
                deadline: req.body.datepicker,
                gameCode: createCode(),
                creator_id: user.id
            }).then(function(challenge) {
                // add user as participant in challenge
                user.addChallenge(challenge, {
                    through: {
                        score: 0 // create score: default 0
                    }
                }).then(function(score) {
                    console.log("should have succeeded");
                    res.redirect("/dashboard");
                });
            });
        }).catch(function(error) {
            // send error message 
            console.log(error);
            res.redirect("/dashboard");
        });
        // QUESTION: do I need catches on each then promise?
    };


exports.joinChallenge = function(req, res) {
        
        // create score: default 0
        // add user as participant in challenge
        // re-route to /challenge page

        // find user
        db.User.findOne({
            where: {
                id: req.user.id
            }
        }).then(function(user) {
            // find challenge
            db.Challenge.findOne({
                where: { 
                    gameCode: req.body.gameCode
                }
            }).then(function(challenge) {
                // add user as participant in challenge
                user.addChallenge(challenge, {
                    through: {
                        score: 0 // create score: default 0
                    }
                }).then(function(score) {
                    console.log(challenge);
                    res.redirect("/challenge/" + challenge.id);
                });
            });
        }).catch(function(error) {
            // send error message 
            res.json(error);
        });
    };

exports.updateScore = function(req, res) {
        db.Score.update({
            score: req.body.score
        },{
            where: {
                user_id: req.user.id,
                challenge_id: req.params.id
            }
        }).then(function(score) {
            console.log("Score:",score);
            res.redirect("/challenge/"+ req.params.id);
        });
    };








exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/signin');
 
    });
    
 


}

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