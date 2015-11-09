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
      plaintext: {
        value : undefined,
        type : 'ascii'
      },
      key : {
        value : undefined,
        type: 'ascii'
      },
      ciphertext : {
        value : undefined,
        type : 'hex'
      }
    };

    $scope.encrypt = function(plaintext, key){
      var size;
      var thePlaintext = [], theKey = [];

      // convert the input strings into arrays
      if (plaintext.type === 'ascii') {
        thePlaintext = convert.stringToArray(plaintext.value);
      } else {
        thePlaintext = convert.hexToArray(plaintext.value);
      }
      if (key.type === 'ascii') {
        theKey = convert.stringToArray(key.value);
      } else {
        theKey = convert.hexToArray(key.value);
      }

      // set the proper byte-size for the key
      if (key.value.length < 17) {size = 16;}
      else if (key.value.length < 25) {size = 24;}
      else {size = 32;}

      theKey = aes.parseKey(theKey,size);
      $scope.encryption.ciphertext.value = convert.arrayToHexString(aes.encrypt(thePlaintext, theKey), true);
    };

    $scope.clearEncrypt = function(){
      $scope.encryption.ciphertext.value = '';
      $scope.encryption.plaintext.value = '';
      $scope.encryption.key.value = '';
    };

    // set the type of an input string to ascii or hex
    $scope.setType = function(direction,input,type){
      $scope[direction][input].type = type;
      $scope[direction][input].value = '';
      if (direction === 'encryption') {
        $scope[direction].ciphertext.value = '';
      } else {
        $scope[direction].plaintext.value = '';
      }
    };


}]);
