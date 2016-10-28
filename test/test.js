//var assert = require('assert');
//describe('Array', function () {
//    describe('#indexOf()', function () {
//        it('should return -1 when the value iscx not present', function () {
//            assert.equal(-1, [1, 2, 3].indexOf(4));
//        });
//    });
//});

//var should = require('chai').should()//actually call the function
//  , foo = 'bar'
//  , beverages = { tea: ['chai', 'matcha', 'oolong'] };

//describe('Sample should test', function () {
//    it('should return string when the type is string', function () {
//        foo.should.have.length(4);
//    });
//});

//foo.should.be.a('string');
//foo.should.equal('bar');
//foo.should.have.length(3);
//beverages.should.have.property('tea').with.length(3);



var mongoose = require("mongoose");
var  highlightsModel = require('../model/highlights');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);


describe('Highlights', function () {
    beforeEach(function (done) { //Before each test we empty the database
        highlightsModel.remove({}, function (err) {
            done();
        });
    });
});

describe('Highlights', function () {

    //beforeEach(function (done) { //Before each test we empty the database
    //    highlightsModel.remove({}, function (err) {
    //        done();
    //    });
    //});

    it('should list ALL Highlights on /highlights GET',function (done) {
     chai.request(server)
    .get('/highlights')
    .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should list a SINGLE Highlight on /highlights/<id> GET');
    

    it('should add a SINGLE Highlight on /highlights POST');
    

    it('should update a SINGLE Highlight on /highlights/<id> PUT');
    

    it('should delete a SINGLE Highlight on /highlights/<id> DELETE');


});




//describe('Highlights GET test', function () {
//    it('should return string when the type is string', function () {
//        foo.should.have.length(4);
//    });
//});

