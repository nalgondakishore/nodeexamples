var app = angular.module("helpme.controllers", []);

app.controller('maincontroller', function ($scope) {

    $scope.message = "Hello Kishore";
    $scope.showModal = false;
    $scope.open = function(){
        $scope.showModal = true;
    };
      $scope.close = function(){
        $scope.showModal = false;
    };
      $scope.loggedinusername = "nalgondakishore";
      $scope.userServiceProfileList = newsContentsService.getNewsContents();
    
});


//ServiceProvider page controller
app.controller('serviceProviderController', function ($scope,$http, newsContentsService) {
   
    // $scope.newsContents = newsContentsService.getNewsContents();

    $http({
        method: 'GET',
        url: "http://localhost:3000/highlights"
    }).then(function successCallback(response) {

        $scope.newsContents = response.data;

    }, function errorCallback(response) {
        console.log(response.statusText);
    });

    $scope.saveContent = function (newsContent) {
        if ($scope.isupdate) {
          
            var dataupdateObj = {
                ContentId: newsContent.ContentId,
                Status: newsContent.Status,
                PostedBy: newsContent.PostedBy,
                ContentType: newsContent.ContentType,
                ContentTitle: newsContent.ContentTitle,
               // Image: newsContent.Image,
                Content: newsContent.Content,
                _id : newsContent._id
            };
            var file = $scope.myFile;
            if (file != undefined) {
                newsContentsService.uploadfiles(file, function (err, data) {
                    dataupdateObj.Image = data.filepath;
                    if (!err) {
                        newsContentsService.postNewsContent(dataupdateObj, function () {
                            $scope.Refresh();
                        });
                    }
                });
            }
            else {
                newsContentsService.postNewsContent(dataupdateObj, function () {
                    $scope.Refresh();
                });
            }
            $scope.isupdate = false;
        }
        else {
             var dataObj = {
                ContentId: '9999',
                Status: 'New',
                PostedBy: 'Kishore',
                ContentType: newsContent.ContentType,
                ContentTitle: newsContent.ContentTitle,
                Image: newsContent.Image,
                Content: newsContent.Content
             };
                 var file = $scope.myFile;
                 newsContentsService.uploadfiles(file, function (err,data) {
                     if (!err)
                     {
                        dataObj.Image = data.filepath;
                        newsContentsService.addNewsContent(dataObj, function () {
                                $scope.Refresh();
                            
                            });
                     };
                 });
                
            
            $scope.isupdate = false;
        }
        $scope.clearAll(newsContent);
    };

    $scope.Refresh = function () {
        $http({
            method: 'GET',
            url: "http://localhost:3000/highlights"
          }).then(function successCallback(response) {
            $scope.newsContents = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    };

    $scope.Delete = function (newsContent) {
       
        $scope.isupdate = false;
        newsContentsService.deleteNewsContent(newsContent, function () {
            $scope.Refresh();
        });
        
    };

    $scope.Edit = function (newsContent) {
        $scope.newsContent = angular.copy(newsContent);
        $scope.isupdate = true;
    };

    $scope.clearAll = function (newsContent) {
        newsContent.ContentId = '';
        newsContent.Status = '';
        newsContent.PostedBy = '';
        newsContent.ContentType = '';
        newsContent.ContentTitle = '';
        newsContent.Image = '';
        newsContent.Content = '';
        $scope.EditIndex = '';
        $scope.myFile = '';
    };

    $scope.Years = [{
        id: 2016,
        name: "2016"
    }, {
        id: 2017,
        name: "2017"
    }, {
        id: 2018,
        name: "2018"
    }];
    $scope.selected_year = 2016;


    $scope.Months = [{
        id: 1,
        name: "January"
    }, {
        id: 2,
        name: "Febraury"
    }, {
        id: 3,
        name: "March"
    }];
    $scope.selected_month = 1;


 



});



//ServiceProfile page controller
app.controller('userProfileController', function ($scope,$filter) {

    $scope.userrating ="0";
    $scope.showSidebar = true;
 
    
    $scope.userprofile =  {
      "username": "Kishore",
        "servicelocation": "Hyderabad, India",
        "website": "wipro.com",
        "contactnumber": "+919959300335",
        "email": "kishore.wipro.com",
        "servicetype": "painter",
        "fullname": "Kishore",
        "ratecard": "Read More",
        "serviceprofilesummary": "I am working as painter from past 5 years and have worked with contractors like L&TI am working as painter from past 5 years and have worked with contractors like L&TI am working as painter from ",
        "reviewerscount": "100",
        "profilecreateddate": "16/02/2015",
        "comments":[{"rating":"5","commenttext":"This guy is good and nice work done by sameI am working as painter from past 5 years and have worked with contractors ","commenttype":"receiver","commenteduser":"nalgondakishore","date":"12/12/2014"}],
        "image":"https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-0/s235x165/10431475_10200991471787285_6228671195034447035_n.jpg?oh=7df407345432f4c0b96c3825ef15a355&oe=56CD38AD"
    };
    
    $scope.usersreviewcount =  $scope.userprofile.comments.length;
    $scope.averageuserrating =  "3";
    
    $scope.postComment = function(){
            var date = new Date();
            $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
            var jsoncomments = {};
            jsoncomments.rating = $scope.userrating;
            jsoncomments.commenttext =$scope.commentText + "Rating:"+ $scope.rate;
            jsoncomments.commenteduser =$scope.loggedinusername;
            jsoncomments.date =$scope.ddMMyyyy;

            $scope.userprofile.comments.push(jsoncomments);
                $scope.commentText = "";
                $scope.userrating ="0";
    };
    
    $scope.cancelComment = function(){
         $scope.commentText = "";
    };

});




//ServiceProfileList page controller
app.controller('serviceProfileListController', function ($scope, $filter,$location, userProfileService, shareDataService,filterByFilter) {
    
   /* $scope.formData = {};
    $scope.data = {};
    $scope.userServiceProfileList = [];
    $scope.toggle = false;*/
    if(shareDataService.searchlocation != "")
        {
            $scope.resultspanelheader = "Search Results For " + shareDataService.searchlocation;
        }
    else
        {
            $scope.resultspanelheader = "Search Results For Current Location"
 
        }
    $scope.gPlace;

    $scope.profilerating = "3";

    $scope.timeslots = [{'value':'0:0','text':'ANY TIME'},{'value':'6:9','text':'6AM to 9AM'},{'value':'9:12','text':'9AM to 12PM'},{'value':'12:15','text':'12PM to 3PM'},{'value':'15:18','text':'3PM to 6PM'},{'value':'18:21','text':'6PM to 9PM'}];
    
    $scope.sortcategorylist = [{'value':'recomended','text':'Recomended'},{'value':'rating','text':'Rating'},{'value':'lowrate','text':'Price: (Low to High)'},{'value':'highrate','text':'Price: (High to Low)'},{'value':'reviewcount','text':'Reviewers Count'}];
    
    $scope.filtereduserlist = userProfileService.getServiceProfiles(shareDataService.searchlocation,shareDataService.selectedItem);
    $scope.userServiceProfileList = $scope.filtereduserlist;
    
    $scope.showServiceProfile = function() {
        $location.path('/userprofile');
        };

    $scope.applyfilter = function(){
      
        $scope.filterdate =  $filter('date')($scope.dt,'dd/MM/yyyy');
      
        if( $scope.filterdate != '')
        {
           $scope.userServiceProfileList = $filter('filter')($scope.filtereduserlist, {
               availability: { date: '!'+ $scope.filterdate , 
                   timeslots:{ timeslot:'!'+ $scope.filtertime }
                             }
            });
            $scope.toggle = false;
        }
        switch($scope.sortcategory)
        {
              case "rating":
                  $scope.userServiceProfileList = $filter('orderBy')($scope.userServiceProfileList,'+rating');
                  break;
              case "lowrate":
                  $scope.userServiceProfileList = $filter('orderBy')($scope.userServiceProfileList,'+ratecard');
                  break;  
              case "highrate":
                  $scope.userServiceProfileList = $filter('orderBy')($scope.userServiceProfileList,'-ratecard');
                  break; 
              case "reviewcount":
                  $scope.userServiceProfileList = $filter('orderBy')($scope.userServiceProfileList,'+reviewerscount');
                  break; 
              default:
                  $scope.userServiceProfileList = $filter('orderBy')($scope.userServiceProfileList,'profilecreateddate');
          }

    }
    
    $scope.search = function(){
         $scope.filtereduserlist =                               userProfileService.getServiceProfiles(shareDataService.searchlocation,shareDataService.selectedItem);
    $scope.userServiceProfileList = $scope.filtereduserlist;
        ResetSearchResults();
    }
    
    function ResetSearchResults(){
            shareDataService.searchlocation = $scope.searchlocation;
    if(shareDataService.searchlocation != "")
        {
            $scope.resultspanelheader = "Search Results For " + shareDataService.searchlocation;
        }
    else
        {
            $scope.resultspanelheader = "Search Results For Current Location"
 
        }
    }
  
});




// Home page controller
app.controller("homeController", function ($scope, $location, userProfileService, shareDataService) {

    $scope.serviceTypes = ['Painter', 'Carpenter', 'Beautician', 'Driver', 'Electrician','Others'];
    $scope.selectedItem = "Service";
    $scope.gPlace;
    $scope.showServiceProfiles = function () {
        if ($scope.selectedItem != "Service") {
            shareDataService.selectedItem = $scope.selectedItem;
            shareDataService.searchText = $scope.searchlocation;
            shareDataService.searchlocation = $scope.searchlocation;

            
           // $scope.userServiceProfileList = userProfileService.getServiceProfiles(shareDataService.searchText, shareDataService.selectedItem);
            
            
            $location.path('/serviceprofilelist');
        }
    };
    $scope.dropboxitemselected = function (item) {
        $scope.selectedItem = item;
        //$scope.searchText = $scope.searchText + item;
    };
});





//Login Controller
app.controller("loginController", function ($scope, $location, $auth,userProfileService, shareDataService) {

   
    $scope.authenticate = function (provider ) {

        $auth.authenticate(provider)
          .then(function () {
              alert("success" + provider);
              $location.path('/');
          })
          .catch(function (response) {
              alert("error" + provider + " response: " + response + " responsedata: " + response.data);
          });
        
    }
    $scope.dropboxitemselected = function (item) {
        $scope.selectedItem = item + "  ";
    }
});



//News Letter page controller
app.controller('newsLetterController', function ($scope,$http,$filter, newsContentsService) {

    $scope.staticurl = 'http://localhost:3000/';

    $http({
        method: 'GET',
        url: "http://localhost:3000/highlights"
    }).then(function successCallback(response) {
        $scope.newsContents = response.data;
        $scope.bpNewsarticlesList = $filter('filter')($scope.newsContents, { ContentType: 'bpnews' });

        $scope.technologyarticlesList = $filter('filter')($scope.newsContents, { ContentType: 'technology' });

        $scope.editorialsarticlesList = $filter('filter')($scope.newsContents, { ContentType: 'editorials' });

        $scope.customersarticlesList = $filter('filter')($scope.newsContents, { ContentType: 'stories' });

    }, function errorCallback(response) {
        console.log(response.statusText);
    });

   

});


//Admin page controller
app.controller('adminController', function ($scope, $location, userProfileService, shareDataService) {

    $scope.getNewsLetter = function () {
      
        html2canvas([document.getElementById('adminpage')], {
           
            onrendered: function (canvas) {
                var img = canvas.toDataURL('img');
                var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 20, 20);
                doc.save('sample-file.pdf');
            },
            background: '#fff'


        });
        //var doc = new jsPDF();
        //var specialElementHandlers = {
        //    '#editor': function (element, renderer) {
        //        return true;
        //    }
        //};


        //doc.fromHTML($('#adminpage').html(), 15, 15, {
        //    'width': 170,
        //    'elementHandlers': specialElementHandlers
        //});
        //doc.save('sample-file.pdf');
    }
});