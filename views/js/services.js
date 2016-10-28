

"use strict";

var app = angular.module("helpme.services", []);

// This Service designed to perform user service profile operations and the same can be used across controllers and pages
app.service('userProfileService', function ($http) {
    
    
    var serviceProfileList = [{
      "username": "Hello User1",
        "servicelocation": "Hyderabad, India",
        "website": "wipro.com",
        "contactnumber": "+919959300335",
        "email": "kishore.wipro.com",
        "servicetype": "painter",
        "fullname": "Hello User1",
        "ratecard": "Read More",
        "serviceprofilesummary": "I am working as painter from past 5 years and have worked with contractors like L&T",
        "reviewerscount": "5",
        "availableslots":"6:9",
        "profilecreateddate": "02/11/2015",
        "servicetype": "painter",
        "availability":
            [{
                "date":"01/11/2015",
                "timeslots":[{
                    "timeslot":"6:9",
                    "booked":true
                }]},{
                "date":"02/11/2015",
                "timeslots":[{
                    "timeslot":"6:9",
                    "booked":true
                }]}],
        "comments":[{"rating":"5","commenttext":"This guy is good and nice work done by same","commenttype":"receiver","commenteduser":"nalgondakishore","date":"12/12/2014"}],
        "image":"https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png"
    },{
      "username": "Hello User2",
        "servicelocation": "Hyderabad, India",
        "website": "wipro.com",
        "contactnumber": "+919959300335",
        "email": "kishore.wipro.com",
        "servicetype": "painter",
        "fullname": "Hello User2",
        "availableslots":"9:12",
        "ratecard": "Read More",
        "serviceprofilesummary": "I am working as painter from past 5 years and have worked with contractors like L&T",
        "reviewerscount": "3",
        "profilecreateddate": "16/02/2015",
         "availability":[
            {
                "date":"03/11/2015",
                "timeslots":[{
                    "timeslot":"9:12",
                    "booked":true
                }]
            },
            {
                "date":"04/11/2015",
                "timeslots":[{
                    "timeslot":"9:12",
                    "booked":true
                }]
            }
            
        ],
        "servicetype": "painter",
        "comments":[{"rating":"5","commenttext":"This guy is good and nice work done by same","commenttype":"receiver","commenteduser":"nalgondakishore","date":"12/12/2014"}],
        "image":"https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png"
    },{
      "username": "Hello User3",
        "servicelocation": "Hyderabad, India",
        "website": "wipro.com",
        "contactnumber": "+919959300335",
        "email": "kishore.wipro.com",
        "servicetype": "painter",
        "fullname": "Hello User3",
        "availableslots":"12:15",
        "ratecard": "Read More",
        "serviceprofilesummary": "I am working as painter from past 5 years and have worked with contractors like L&T",
        "reviewerscount": "56",
        "profilecreateddate": "16/02/2015",
         "availability":[
            {
                "date":"05/11/2015",
                "timeslots":[{
                    "timeslot":"12:15",
                    "booked":true
                }]
            },
            {
                "date":"06/11/2015",
                "timeslots":[{
                    "timeslot":"12:15",
                    "booked":true
                }]
            }
            
        ],
        "servicetype": "painter",
        "comments":[{"rating":"5","commenttext":"This guy is good and nice work done by same","commenttype":"receiver","commenteduser":"nalgondakishore","date":"12/12/2014"}],
        "image":"https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png"
    }
    ];
    
   
    var addServiceProfile = function (newObj) {
        $http.post('http://localhost:8080/userprofile',newObj)
        .success(function(data){
            console.log("data posted successfully");
        })
        .error(function(error){
        console.log("data posting error");
        });
        serviceProfileList.push(newObj);
    };

    var getServiceProfiles = function (servicetype, searchstring) {
       /* $http.get('http://localhost:8080/userprofile')
            .success(function(data){
               serviceProfileList = data; 
            })
            .error(function(data){
            //console.log("error occured while making a call: "+data);
        });
        */
        return serviceProfileList;
    };

    var getServiceProfile = function (username) {
        $http.get("/api/serviceprofile?username="+username)
            .success(function(data){
               serviceProfile = data; 
            })
            .error(function(data){
            consol.log("error occured while making a call: "+data);
        });
        return serviceProfile;
    };
    return {
        addServiceProfile: addServiceProfile,
        getServiceProfiles: getServiceProfiles,
        getServiceProfile: getServiceProfile
    };

});

app.service('newsContentsService', function ($http) {
    
    
    var newsContentsList = [ ];
    
    var addNewsContent = function (newObj,cb) {

    $http.defaults.headers.put["Content-Type"] = "application/text";
    $http.put('http://localhost:3000/highlights', JSON.stringify(newObj)).then(function (response) {
        if (response.data)
            cb();
            console.log("data posted successfully");
    }, function (response) {
        
             console.log("data posting error");
        });
    
    };

    var getNewsContents = function () {

        $http.get('http://localhost:3000/highlights')
             .success(function(data){
                 newsContentsList = data; 
                 //return data;
             })
             .error(function(data){
                console.log("error occured while making a call: "+data);
         });
         
         return newsContentsList;
    };

    var postNewsContent = function (newObj,cb) {
       
        $http.defaults.headers.post["Content-Type"] = "application/text";
        $http.post('http://localhost:3000/highlights', JSON.stringify(newObj)).then(function (response) {
           
            if (response.data)
                cb();
                console.log("data posted successfully");
        }, function (response) {
            cb();
            console.log("data posting error");
        });
        return;
    };

    var deleteNewsContent = function (newObj,cb) {
       

        var data = angular.toJson(newObj);

        $http({  
            method: "DELETE",  
            url: "http://localhost:3000/highlights",  
            data: data,  
            headers: {'Content-Type': 'application/text' }  
        }).then(function successCallback(response) {
            cb();
        }, function errorCallback(response) {
            cb();
        });

        return;
        
    };

    //the save method
    var uploadfiles = function (file,cb) {
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/upload',
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var fd = new FormData();
                fd.append('file', file);
                return fd;
            }
        }).then(function successCallback(response,err) {
            cb(err,response.data);
        }, function errorCallback(response) {
            cb(err,response.data);
        });
    };

    return {
        addNewsContent: addNewsContent,
        getNewsContents: getNewsContents,
        postNewsContent: postNewsContent,
        deleteNewsContent:deleteNewsContent,
        uploadfiles:uploadfiles
    };

});

// This Srvice designed to share the data variables between controllers and pages
app.service('shareDataService', function () {
    var _selecteditem = "";
    var _searchtext = "";
    var _searchlocation = "";
    var _selectedusername = "";
    this.selectedItem = _selecteditem;
    this.searchText = _searchtext;
    this.selectedUserName = _selectedusername;
    this.searchlocation = _searchlocation;


});
