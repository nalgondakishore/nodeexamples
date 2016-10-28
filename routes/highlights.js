var express = require('express');
var router = express.Router();
var highlightscontroller = require('../controller/highlightscontroller');
var User = require('../model/user');
var config = require('../config/config');
var app = express();



/* highlights CRUD operation. */
router.get('/highlights', function (req, res) { highlightscontroller.getHighlights(req, res); });
router.post('/highlights', function (req, res) { highlightscontroller.updateHighlights(req, res); });
router.put('/highlights', function (req, res) { highlightscontroller.createHighlights(req, res); });
router.delete('/highlights', function (req, res) { highlightscontroller.deleteHighlights(req, res); });

///* SEARCH highlights. */
//router.search('/', function (req, res) {
//   highlightscontroller.getHighlights(req, res);
//});


router.get('/setup', function (req, res) {
    
    // create a sample user
    console.log("hello user");
    var nick = new User({
        name: 'Kishore Cerminara', 
        password: 'password',
        admin: true
    });
    
    // save the sample user
    nick.save(function (err) {
        if (err) throw err;
        
        console.log('User saved successfully');
        res.json({ success: true });
    });
});

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});


var jwt = require('jsonwebtoken'); // used to create,sign and verify token

// route to authenticate a user (POST)
router.post('/authenticate', function (req, res) {
    
    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        
        if (err) throw err;
        
        if (!user) {
            
            console.log(req.body);
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            console.log(req.body);
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                
                // if user is found and password is right
                // create a token  user, app.get('superSecret')
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });
                
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

module.exports = router;