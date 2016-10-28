var highlightsModel = require('../model/highlights');
var db = require('../util/dbutil');
var httputility = require('../util/httputil');

exports.getHighlights = function (request, response) {
    var modelobj = highlightsModel.Highlights;
    db.getall(modelobj, function (data, err) {
        if (err) { httputility.sendHttpdataerror(request, response, err); }
        else { httputility.sendHttpdata(request, response, data); }
    });
}
exports.find = function (request, response) {
    var modelobj = highlightsModel.Highlights;
    var highlightsobj = { ContentId: '1' };
    db.findobj(modelobj, highlightsobj, function (data, err) {
        if (err) console.log(err);
        console.log(data);
    });

}

exports.createHighlights = function (request, response) {
    var modelobj = highlightsModel.Highlights;
    var jsonstring = '';
    request.on('data', function (data) {
        jsonstring += data;
        console.log("jsondata" + jsonstring);
       
    });
    
    request.on('end', function () {
        try {
            if (!jsonstring) throw new Error("Input is not Valid");
            
            db.createobj(modelobj, JSON.parse(jsonstring), function (data, err) {
                if (err) { httputility.sendHttpdataerror(request, response, err); }
                else {
                    data = { data: "Highlights Created suucessfully" };
                    httputility.sendHttpdata(request, response, data);
                }
            });
        } catch (ex) {
            httputility.sendHttpdataerror(request, response, ex);
        }
    });
}

exports.updateHighlights = function (request, response) {
    var modelobj = highlightsModel.Highlights;
    var jsonstring = '';
    request.on('data', function (data) {
        jsonstring += data;
    });
    
    request.on('end', function () {
        
        try {
            if (!jsonstring) throw new Error("Input is not Valid");
            var highlightsobj = JSON.parse(jsonstring);
            if (highlightsobj.ContentId != '' && highlightsobj.ContentId != 'undefined') {
                //var queryobj = { ContentId: highlightsobj.ContentId };
                var queryobj = { _id: highlightsobj._id };
                db.updateobj(modelobj, queryobj, highlightsobj, function (data, err) {
                    if (err) { httputility.sendHttpdataerror(request, response, err); }
                    else {
                        data = { data: "Highlight updated suucessfully" };
                        httputility.sendHttpdata(request, response, data);
                    }
                });
            }
            else {
                httputility.sendHttpdataerror(request, response, "Input Data is Invalid");
            }
        }
        catch (ex) {
            httputility.sendHttpdataerror(request, response, ex);
        }
    });

}

exports.deleteHighlights = function (request, response, requestbody) {
    var modelobj = highlightsModel.Highlights;
    var jsonstring = '';
    
    request.on('data', function (data) {
        jsonstring += data;
    });
    
    request.on('end', function () {
        try {
            if (!jsonstring) throw new Error("Input is not Valid");
            console.log(jsonstring);
            var highlightsobj = JSON.parse(jsonstring);
            var queryobj = { _id: highlightsobj._id };

            db.deleteobj(modelobj, queryobj, function (data, err) {
                if (err) {
                    console.log(err);
                    httphandler.sendHttpdataerror(request, response, err);
                }
                else {
                    data = { data: "Highlight data deleted suucessfully" };
                    httputility.sendHttpdata(request, response, data);
                }
            });
        } catch (ex) {
            console.log(ex);
            httputility.sendHttpdataerror(request, response, ex);
        }
    });
    
}