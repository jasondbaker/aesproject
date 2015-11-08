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

    $scope.encryption = {
      plaintext: undefined,
      key : undefined,
      ciphertext : undefined
    };

    $scope.encrypt = function(plaintext, key){
      var size;

      // convert the input strings into arrays
      plaintext = convert.stringToArray(plaintext);
      key = convert.stringToArray(key);

      // set the proper byte-size for the key
      if (key.length < 17) {size = 16;}
      else if (key.length < 25) {size = 24;}
      else {size = 32;}

      key = aes.parseKey(key,size);
      $scope.encryption.ciphertext = convert.arrayToHexString(aes.encrypt(plaintext, key), true);
    };

    $scope.clearEncrypt = function(){
      $scope.encryption.ciphertext = '';
      $scope.encryption.plaintext = '';
      $scope.encryption.key = '';
    };

}]);
