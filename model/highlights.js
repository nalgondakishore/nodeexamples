var mongoose = require('mongoose');

//var highlightsSchema = new mongoose.Schema({
//    Level : String,
//    ContentTitle: String,
//    Content: String,
//    ContentType: String,
//    ImagePath:String,
//    Status:String,
//    LevelID : String
    
//});

var highlightsSchema = new mongoose.Schema( {
Content: String,
Image: String,
ContentType: String,
PostedBy: String,
ContentId: String,
ContentTitle: String,
Status: String
});


var Highlights = mongoose.model('highlights', highlightsSchema);

exports.Highlights = Highlights;

