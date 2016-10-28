
var BSON = require('bson').BSONPure;
var binary = require('binary');
var body = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var httputility = require('../util/httputil');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage }).single('file');

exports.upload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            
            return res.end("Error uploading file.");
        }
        data = { Message: "success",filepath: req.file.path.replace('\\','/') };
        httputility.sendHttpdata(req, res, data);
        //console.log(req.file.path);
        //res.end("File is uploaded");
    });
};


