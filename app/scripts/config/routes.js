'use strict';

// configure app routes
angular.module('aesApp')
.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'MainCtrl'
        })

        .when('/decryption', {
            templateUrl : 'views/main.html',
            controller  : 'MainCtrl'
        })

        .when('/encryption', {
            templateUrl : 'views/main.html',
            controller  : 'MainCtrl'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'views/about.html'
        });

});
