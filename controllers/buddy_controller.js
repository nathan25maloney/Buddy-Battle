var db = require("../models");


module.exports = function(app) {
	// ========================
	// HTML
	// ========================

	// display login page
	app.get("/", function(req, res) {
	  	res.render('index'); // load index page
	});


	// log user in
	app.post("/login", function(req, res) {
	 
	});


	// user dashboard
	// displays all challenges associated with the user
	app.get("/dashboard", function(req, res) {

	  	

	  	res.render('dashboard'); // load index page

	});

	// displays information on a single challenge
	// displays all participants and their scores
	app.get("/challenge", function(req, res) {

	  	res.render('challenge'); // load index page
	});

	// ========================
	// API (/api)
	// ========================


	// USER
	// get all challenges by user id
	app.get("/api/user/:id", function(req, res) {
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
	});

	// create new user
	app.post("/api/user/new", function(req, res) {
		// create new user
		db.User.bulkCreate([
			{
				name:"Catherine",
				username: "nicerateh",
				password: "manatee"
			},
			{
				name:"Catherine",
				username: "nicerateh1",
				password: "manatee"
			}
		],).then(function(users) {
			// send user created
			res.json(users);
		}).catch(function(error) {
			// send error message 
			res.json(error);
		});

		// db.User.create({
		// 	name:"Catherine",
		// 	username: "nicerateh",
		// 	password: "manatee"
		// }).then(function(result) {
		// 	res.json(result);
		// }).catch(function(error) {
		// 	// send error message 
		// 	res.json(error);
		// });
	});

	// CHALLENGE
	// get challenge by id and get all users and scores
	app.get("/api/challenge/:id", function(req, res) {
		// find challenge by id
		db.Challenge.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(challenge) {
			// get all users and scores
			challenge.getUsers().then(function(users) {
				res.json({challenge,users});
			});
		});
	});

	// create new challenge
	app.post("/api/challenge/new", function(req, res) {
		// find user
		db.User.findOne({
			where: {
				id: 1
			}
		}).then(function(user) {
			// create challenge
			db.Challenge.create({
				name: "challenge",
				description: "this is a challenge",
				measurement: "# of tacos",
				deadline: new Date(),
				gameCode: "QQQQQ",
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
	});

	// join existing challenge
	app.post("/api/challenge/join", function(req, res) {
		
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
					gameCode: "QQQQ1"
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
	});

	// SCORE
	// create/update score
	app.post("/api/challenge/:id/score", function(req, res) {
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
	});

};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// update winner_id everytime score is added/changed
function updateWinner(id) {
	db.Score.findAll({
		where: {
			challenge_id: id
		}
	}).then(function(scores) {

	});
}

