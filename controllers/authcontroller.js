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
        user.getChallenges().then(function(challenges) {
            console.log(user);
            res.render('dashboard', {user: req.user,challenges});
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
            console.log("Challenge", challenge);
            res.render('challenge', { challenge, users});
        });
    });
	
}

exports.newChallenge = function(req, res) {
        // find user
        db.User.findOne({
            where: {
                id: req.id
            }
        }).then(function(user) {
            // create challenge
            db.Challenge.create({
                name: "challenge",
                description: "this is a challenge",
                measurement: "# of tacos",
                deadline: new Date(),
                gameCode: createCode(),
                creator_id: user.id
            }).then(function(challenge) {
                // add user as participant in challenge
                user.addChallenge(challenge, {
                    through: {
                        score: 0 // create score: default 0
                    }
                }).then(function(score) {
                    res.json({user,challenge,score});
                });
            });
        }).catch(function(error) {
            // send error message 
            res.json(error);
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
                id: 2
            }
        }).then(function(user) {
            // find challenge
            db.Challenge.findOne({
                where: { 
                    gameCode: createCode();
                }
            }).then(function(challenge) {
                // add user as participant in challenge
                user.addChallenge(challenge, {
                    through: {
                        score: 0 // create score: default 0
                    }
                }).then(function(score) {
                    res.json({user,challenge,score});
                });
            });
        }).catch(function(error) {
            // send error message 
            res.json(error);
        });
    };

exports.createUpdateScore = function(req, res) {
        db.Score.update({
            score: 5
        },{
            where: {
                user_id: 1,
                challenge_id: 1
            }
        }).then(function(score) {
            res.json(score);
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