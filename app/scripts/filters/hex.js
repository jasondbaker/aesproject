'use strict';

/**
 * @ngdoc filter
 * @name aesApp.filter:hex
 *
 * @description
 * Changes a hex string to an ascii
 *
 *
 ```

 */

angular.module('aesApp')
.filter('hex', ['convert', function(convert) {
    return function(input, isEnabled){

    if (input && isEnabled) {
      input = convert.arrayToString(convert.hexToArray(input));
    }

    return input;
  };
}]);
