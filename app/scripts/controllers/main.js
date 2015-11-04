'use strict';

/**
 * @ngdoc function
 * @name aesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aesApp
 */
angular.module('aesApp')
  .controller('MainCtrl', ['$scope', 'aes', function ($scope, aes) {

    $scope.message = 'Hello Big World!'; // Hello Big World!

    var stringToHexArray = function (s) {
      var hex = [];
      for (var i=0; i < s.length; i++) {
        hex.push(s.charCodeAt(i).toString(16).toUpperCase());
      }
      return hex;
    };

    var hexArrayToString = function (h) {
      var str = '';
      for (var i=0; i < h.length; i++) {
        str = str + String.fromCharCode(parseInt(h[i], 16));
      }
      return str;
    };

    $scope.byteMessage = stringToHexArray($scope.message);

    $scope.convMessage = hexArrayToString($scope.byteMessage);


  }]);
