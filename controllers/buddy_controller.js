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
	// get user by id
	app.get("/api/user/id/:id", function(req, res) {
	 
	});

	// get user by username
	app.get("/api/user/username/:username", function(req, res) {
	 
	});

	// get all challenges by user id

	app.get("/api/user/:id/challenges", function(req, res) {
	 
	});

	// get user by id
	app.get("/api/user/id/:username", function(req, res) {
	 
	});

	// create new user
	app.post("/api/user/new", function(req, res) {
	  
	});

	// CHALLENGE
	// get challenge by id
	app.get("/api/challenge/:challengeId", function(req, res) {
	 
	});

	// GET all users participating in challenge
	app.get("/api/challenge/:challengeId/user", function(req, res) {
	 
	});

	/// GET all score participating in challenge
	app.get("/api/challenge/:challengeId/scores", function(req, res) {
	 
	});

	// create new challenge
	app.post("/api/challenge/new", function(req, res) {
	  
	});

	// SCORE
	// create/update score
	app.post("/api/challenge/new", function(req, res) {
	  
	});

};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

