var app = angular.module('helpme', ['ngRoute', 'ngAnimate', ,'satellizer','helpme.directives','helpme.services','helpme.controllers', 'ui.bootstrap','angular.filter']);

//ngRoute
app.config(function ($routeProvider, $authProvider) {

   $authProvider.facebook({
        clientId: '1503285863322724'
    });

    $authProvider.google({
        clientId: '951371239131-k7jffd3epnpsehn3pdnvio8hjf8kl4a9.apps.googleusercontent.com'
    });

    $routeProvider.when('/', {
        templateUrl: 'pages/newsletter.html',
        controller: 'newsLetterController'
       
    })
        //.when('/newsletter', {
        //    templateUrl: 'pages/newsletter.html',
        //    controller: 'newsLetterController'
        //})
         .when('/serviceprovider', {
             templateUrl: 'pages/serviceprovider.html',
             controller: 'serviceProviderController'
         })
        .when('/Admin', {
            templateUrl: 'pages/Admin.html',
            controller: 'serviceProviderController'
        })
         .when('/contact', {
             templateUrl: 'pages/contact.html'
         })
         .when('/serviceprofilelist', {
             templateUrl: 'pages/serviceprofilelist.html',
             controller: 'serviceProfileListController'
         })
         .when('/userprofile', {
            templateUrl: 'pages/userprofile.html',
            controller: 'userProfileController'
        })
         .when('/error', {
          templateUrl: 'pages/error.html'
      })
         .otherwise({
        redirectTo: '/'
    });
    
});



























