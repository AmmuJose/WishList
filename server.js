'use strict';

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var Promise = require("bluebird");
var mongoose = require("mongoose");
var social = require("./config/auth");
mongoose.Promise = Promise;

passport.use(new GithubStrategy(social.github, 
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}));

passport.use(new FacebookStrategy(social.facebook, 
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}));


var PORT = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(session({secret: "4567"}));
app.use(passport.initialize());
app.use(passport.session());
var db_url = require("./config/database");
mongoose.connect(db_url.remoteUrl);
var db = mongoose.connection;

db.on("error", function(error){
    console.log("Mongoose Error", error);
});

db.once("open", function(){
    console.log("Mongoose connection successful.");    
});

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});


// Import routes and give the server access to them.
var routes = require("./controller/wishList_controller.js");
app.use(methodOverride("_method"));

app.use("/", routes);

app.listen(PORT);