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
        type : 'ascii',
        parsedPlaintext : undefined,
        padding: undefined
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
      result : undefined,
      type : 'encryption'
    };

    $scope.decryption = {
      plaintext: {
        value : undefined,
        type : 'hex',
        displayAscii : false
      },
      key : {
        value : undefined,
        type: 'hex',
        padding: undefined,
        parsedKey: undefined,
        expandedKey: undefined
      },
      ciphertext : {
        value : undefined,
        type : 'hex'
      },
      result : undefined,
      type : 'decryption'
    };

    // encrypt the provided plaintext message with a key
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

      // parse the plaintext message to pad it if necessary
      thePlaintext = aes.parseMessage(thePlaintext, plaintext.type);
      $scope.encryption.plaintext.parsedPlaintext = thePlaintext.message;
      $scope.encryption.plaintext.padding = thePlaintext.padding;

      // parse the key and add padding if necessary
      theKey = aes.parseKey(theKey,size);
      $scope.encryption.key.parsedKey = convert.arrayToHexString(theKey.key,true);
      $scope.encryption.key.padding = theKey.padding;
      $scope.encryption.key.size = size;

      // encrypt input data
      $scope.encryption.result = aes.encrypt(thePlaintext.message, theKey.key);
      $scope.encryption.ciphertext.value = convert.arrayToHexString($scope.encryption.result.ciphertext, true);
      $scope.encryption.key.expandedKey = convert.arrayToHexString($scope.encryption.result.expandedKey, true);
    };

    // decrypt the provided ciphertext message with a key
    $scope.decrypt = function(ciphertext, key){
      var size;
      var theCiphertext = [], theKey = [];

      // convert the input strings into arrays
      theCiphertext = convert.hexToArray(ciphertext.value);
      if (key.type === 'ascii') {
        theKey = convert.stringToArray(key.value);
      } else {
        theKey = convert.hexToArray(key.value);
      }
      
      // set the proper byte-size for the key
      if (theKey.length < 17) {size = 16;}
      else if (theKey.length < 25) {size = 24;}
      else {size = 32;}

      // pad the provided key if necessary
      theKey = aes.parseKey(theKey,size);
      $scope.decryption.key.parsedKey = convert.arrayToHexString(theKey.key,true);
      $scope.decryption.key.padding = theKey.padding;
      $scope.decryption.key.size = size;

      // decrypt input data
      $scope.decryption.result = aes.decrypt(theCiphertext, theKey.key);
      $scope.decryption.plaintext.value = convert.arrayToHexString($scope.decryption.result.plaintext, true);
      $scope.decryption.key.expandedKey = convert.arrayToHexString($scope.decryption.result.expandedKey, true);
    };

    // reset the specified input form
    $scope.clear = function(type){
      $scope[type].ciphertext.value = '';
      $scope[type].plaintext.value = '';
      $scope[type].key.value = '';
      $scope[type].result = undefined;
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

    // copy ciphertext and key from encryption to decryption form
    $scope.copyFromEncrypt = function() {
      $scope.decryption.key.value = $scope.encryption.key.parsedKey;
      $scope.decryption.ciphertext.value = $scope.encryption.ciphertext.value;
      $scope.decryption.key.type = 'hex';

    };

    // toggle plaintext ascii display
    $scope.toggleAscii = function() {
      $scope.decryption.plaintext.displayAscii = !$scope.decryption.plaintext.displayAscii;
    };

}]);
