'use strict';

/**
 * @ngdoc function
 * @name aesApp.service:aes
 * @description
 * # aes
 * Store all of the AES algorithm functions
 */

angular.module('aesApp.services', [])
  .factory('aes', function() {

    // Service logic
    // ...

    var _pub = {

      test : function(test){
        return test+1;
      }
    };

    return _pub;
  });
