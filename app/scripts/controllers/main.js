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

    $scope.showDetails = false;

    $scope.encryption = {
      plaintext: {
        value : undefined,
        type : 'ascii'
      },
      key : {
        value : undefined,
        type: 'ascii',
        padding: undefined,
        parsedKey: undefined,
        expandedKey: undefined
      },
      ciphertext : {
        value : undefined,
        type : 'hex'
      },
      result : undefined
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
      if (theKey.length < 17) {size = 16;}
      else if (theKey.length < 25) {size = 24;}
      else {size = 32;}

      theKey = aes.parseKey(theKey,size);
      $scope.encryption.key.parsedKey = convert.arrayToHexString(theKey.key,true);
      $scope.encryption.key.padding = theKey.padding;
      $scope.encryption.key.size = size;

      // encrypt input data
      $scope.encryption.result = aes.encrypt(thePlaintext, theKey.key);
      $scope.encryption.ciphertext.value = convert.arrayToHexString($scope.encryption.result.ciphertext, true);
      $scope.encryption.key.expandedKey = convert.arrayToHexString($scope.encryption.result.expandedKey, true);
    };

    $scope.clearEncrypt = function(){
      $scope.encryption.ciphertext.value = '';
      $scope.encryption.plaintext.value = '';
      $scope.encryption.key.value = '';
      $scope.encryption.result = undefined;
      $scope.showDetails = false;
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
