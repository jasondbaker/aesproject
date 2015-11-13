'use strict';

describe('Filter: hex', function () {

  // load the filter's module
  beforeEach(module('aesApp'));

  var convert, hex;

  // initialize a new instance of the filter before each test
  beforeEach(inject(function($filter, _convert_) {
    convert = _convert_;

    hex = $filter('hex');
  }));

  it('should convert hex to ascii', function () {

    expect(hex('74 65 73 74', true)).toBe('test');


  });

});
