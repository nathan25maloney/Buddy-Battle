var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var path = require("path");

var port = process.env.PORT || 3000;

var app = express();
var db = require("./models");

var passport = require('passport');
var flash    = require('connect-flash');

require('./config/passport')(passport);

app.use(cookieParser());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 

require('./config/passport.js')(passport, db.User);

var authRoute = require('./controllers/auth.js')(app, passport);

// Import routes and give the server access to them.






db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});
