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

      // hexToArray helper
      // converts a string containing hex to a decimal array
      // a string with non-hex characters returns an empty array
      hexToArray : function(s) {
        var stringLen = s.length;
        var t = [];

        //remove all whitespace from the string
        s = s.replace(/\s+/g,'');

        // process the string if it doesn't have any non-hex characters
        if (/^[0-9a-fA-F]+$/.test(s)) {

          for (var i=0; i < stringLen; i+=2) {
            t.push(parseInt(s.slice(i,i+2),16));
          }
        }
        return t;
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
