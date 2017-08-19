var express = require("express");
var path = require("path");
var router = express.Router();
var passport = require('passport');
var Promise = require("bluebird");
var mongoose = require("mongoose");
var User = require('../models/User');
var List = require('../models/List');
var mailConfig = require('../config/mail');
var sendMail = require('../utils/send_mail');
mongoose.Promise = Promise;

router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        name = req.user._json.first_name + " " + req.user._json.last_name;
        email = req.user._json.email;
        User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    name: name,
                    email: email
                }
            },
            { upsert: true, new: true },
            function(err, updatedUser) {
                req.session['user info'] = updatedUser;

                if (err) console.log(err);
                else res.redirect('/dashboard');
                //res.json(updatedUser);
            }
        );
        req.session['user name'] = name;
        req.session['email'] = email;
    });


router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        User.findOneAndUpdate(
            { email: req.user.emails[0].value },
            {
                $set: {
                    name: req.user.displayName,
                    email: req.user.emails[0].value
                }
            },
            { upsert: true, new: true },
            function(err, updatedUser) {
                req.session['user info'] = updatedUser;

                if (err) console.log(err);
                else res.redirect('/dashboard');
                //res.json(updatedUser);
            }
        );
        req.session['user name'] = req.user.displayName;
        req.session['email'] = req.user.emails[0].value;
        // console.log(JSON.stringify(req.user, null, 4));
        // console.log(req.user.displayName);
        // console.log(req.user.emails[0].value);
        //res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.post('/share', ensureAuthenticated, function(req, res) {
    //TODO email null check
    var newUsers = [];
    var emails = req.body.emails;
    console.log(req.body.emails);
    List.findOneAndUpdate(
        { _id: req.body.listId },
        { $addToSet: { shared_with: { $each: emails } } },
        { new: true },
        function(err, newList) {
            if (err) console.log(err);
            else {
                sendMail.sendMail(emails, req.session['user name'], req.headers.origin, req.body.title);
                res.json({ "success": "Email Has Been Send." })
            }
        }
    );
});

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get("/logout", ensureAuthenticated, function(req, res) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
});

router.get("/home", ensureAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
});

router.get("/dashboard", ensureAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/dashboard.html'));
});

router.get("/dashboard/get-all-lists", ensureAuthenticated, function(req, res) {
    List.find({owner:req.session['user info']}).sort({_id:-1}).exec(function(err, lists) {
        console.log(lists);
        if (err) console.log(err);
        else res.json(lists);
    });
});

router.get('/dashboard/shared-by-others', ensureAuthenticated, function(req, res) {

    List.find({shared_with: req.session['email']}).populate('owner').exec(function(error, doc) {
        if (error) console.log(errror);
        else {
            res.send(doc);
            console.log(doc);
        }
    });
    
});

router.post('/api/lists', ensureAuthenticated, function(req, res) {
    data = {
        title: req.body.title,
        items: req.body.items,
        owner: req.session['user info']
    }


    var newList = new List(data);
    List.create(newList, function(err, createdList) {
        if (err) console.log(err);
        else {
            console.log(createdList);
            res.json(createdList);
        }
    });
});

// Export routes for server.js to use.
module.exports = router;