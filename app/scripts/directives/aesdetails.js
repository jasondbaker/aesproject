'use strict';

/**
 * @ngdoc directive
 * @name aesApp.directive:aesdetails
 * @restrict E
 *
 * @description
 * Displays the detail information for an encryption/decryption process
 *
 * @param {string} type - Type string denoting encryption or decryption
 * @param {object} key - Key object containing key details
 * @param {object} result - Result object containing expanded key and logs
 *
 ```

 */

angular.module('aesApp')
.directive('aesdetails', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/aesdetails.tpl.html',
      replace: true,
      scope: {
        data: '='
      }
    };
  }
);
