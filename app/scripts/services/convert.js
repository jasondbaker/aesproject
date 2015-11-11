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

      // arrayToHexString
      // converts an array of numbers to a hex string for display
      // bWithSpaces can be set to add a space between hex values
      // code derived from crypto-js (https://code.google.com/archive/p/crypto-js/)
      arrayToHexString: function (a, bWithSpaces) {
        var s = [];

        for (var i=0; i<a.length; i++) {
          /*jslint bitwise: true */
          s.push((a[i] >>> 4).toString(16));
          /*jslint bitwise: true */
          s.push((a[i] & 0xF).toString(16));
          if (bWithSpaces) { s.push(' ');}
        }
        return s.join('').trim();
      },

      // hexToArray helper
      // converts a string containing hex to a decimal array
      // a string with non-hex characters returns an empty array
      hexToArray : function(s) {
        var stringLen;
        var t = [];
        
        //remove all whitespace from the string
        s = s.replace(/\s+/g,'');
        stringLen = s.length;

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
