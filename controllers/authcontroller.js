var db = require('../models')

var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req,res) {
	res.render('dashboard');
}

exports.dashboard = function(req,res) {
	res.render('challenge');
}
exports.userchallenges = function(req, res) {
        // find user by id
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            // get all users and scores
            user.getChallenges().then(function(challenges) {
                res.json({user,challenges});
            });
        });
    };




exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/signin');
 
    });
    
 


}