
var mongoose = require('mongoose');
var config = require('../config/config');

exports.connectmongo = function () {
    
    mongoose.connect(config.mongoconnectionstring, function (error) {
        if (error) throw error; // Handle failed connection
        console.log('conn ready:  ' + mongoose.connection.readyState);
     
    });
   
}

exports.createobj = function (model, dataobj, callback) {
    if (mongoose.connection.readyState !== 1) {
        callback(null, "error in connecting to database");
    }
    else {
        var modelobj = new model(dataobj);
        modelobj.save(function (err, data) {
            if (err) {
                callback(data, err)
            } else { callback(data, err); }
        });
    }

}

exports.getall = function (modelobj, callback) {
    if (mongoose.connection.readyState !== 1) {
        callback(null, "error in connecting to database");
    }
    else {
        modelobj.find({}, function (err, data) {
            if (err) {
              callback(null, err);
            } else {
                callback(data, err);
            }
        });
   }
}


exports.updateobj = function (model, queryobj, dataobj, callback) {
    if (mongoose.connection.readyState !== 1) {
        callback(null, "error in connecting to database");
    }
    else {
        model.update(queryobj, dataobj, function (err, data) {
            if (err) {
                callback(data, err);
            }
            else {
                callback(data, err);
            }
        });
    }
}

exports.deleteobj = function (model, dataobj, callback) {
    if (mongoose.connection.readyState !== 1) {
        callback(null, "error in connecting to database");
    }
    else {
        console.log(JSON.stringify(dataobj));
        model.remove(dataobj, function (err, data) {
            if (err) {
                callback(data, err);
            } else { callback(data, err); }
        });
    }
}

exports.findobj = function (model, dataobj, callback) {
    if (mongoose.connection.readyState !== 1) {
        callback(null, "error in connecting to database");
    }
    else {
        model.find(dataobj, function (err, data) {
            if (err) {
                callback(data, err);
            } else { callback(data, err); }
        });
    }
}