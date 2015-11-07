'use strict';

/**
 * @ngdoc function
 * @name aesApp.service:convert
 * @description
 * # convert
 * conversion helper functions
 */

angular.module('aesApp')
  .factory('convert', function() {

    // Service logic
    // ...

    var _pub = {

      // arrayToHex helper function
      // converts an array of decimal numbers to an array of hex string values for display
      arrayToHex : function(a) {
        var t = [];
        var aLength = a.length;

        for (var i=0; i<aLength; i++) {
          t[i] = a[i].toString(16);
        }
        return t;
      },
      
      // arrayToString helper function
      // converts an array of decimal numbers to an ASCII string for display
      arrayToString : function(a) {
        var s = '';
        var aLength = a.length;

        for (var i=0; i<aLength; i++) {
          s += String.fromCharCode(a[i]);
        }
        return s;
      },

      // stringToArray helper function
      // converts an ASCII string to an array of decimal values
      stringToArray : function(s) {
        var t = [];

        for (var i=0; i< s.length; i++) {
          t[i] = s.charCodeAt(i);
        }
        return t;
      }

    };

    return _pub;
  });
