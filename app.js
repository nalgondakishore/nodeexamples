var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Routing variables for CRUD operations
var highlights = require('./routes/highlights');
var uploadfile = require('./routes/uploadfile');

var mongoose = require('mongoose/'); //mongoose npm package connection
var config = require('./config/config');
var app = express();
var jwt = require('jsonwebtoken');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies.
app.use(bodyParser.json({ limit: '5mb' }));

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Connect to Mongo
app.use(function (req, res, next) {
    if (mongoose.connection.readyState != 1) {
        mongoose.connect(config.mongoconnectionstring, function (error) {
            if (error) {
                console.log("error while connecting to mongo" );
                throw error;
            }// Handle failed connection
            console.log('conn ready:  ' + mongoose.connection.readyState);
            next();
        });
    }
    else {
        next();
    }
});


//below will return token for futher verification of middleware api
//app.post('/authenticate', highlights);

//This method ensures user sent valid token before accessing any api
//app.use(function (req, res, next) {
    
//    // check header or url parameters or post parameters for token
//    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
//    // decode token
//    if (token) {
        
//        // verifies secret and checks exp
//        jwt.verify(token, config.secret, function (err, decoded) {
//            if (err) {
                
//                return res.json({ success: false, message: 'Failed to authenticate token.' });
//            } else {
//                // if everything is good, save to request for use in other routes
//                console.log('decode succesful')
//                req.decoded = decoded;
//                next();
//            }
//        });

//    } else {
        
//        // if there is no token return an error
//        return res.status(403).send({
//            success: false, 
//            message: 'No token provided.'
//        });
    
//    }
//});

//app.post('/upload', uploadfile.upload);

app.use('/', highlights);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
