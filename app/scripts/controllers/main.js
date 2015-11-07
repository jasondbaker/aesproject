'use strict';

/**
 * @ngdoc function
 * @name aesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aesApp
 */
angular.module('aesApp')
  .controller('MainCtrl', ['$scope', 'aes', 'convert',
   function ($scope, aes, convert) {

    $scope.message = convert.stringToArray('This is a message'); // Hello Big World!

}]);
