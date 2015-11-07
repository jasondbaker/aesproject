'use strict';

describe('Service: convert', function () {

  // load the controller's module
  beforeEach(module('aesApp'));

  var convert;

  beforeEach(inject(function (_$rootScope_, _convert_) {
    convert = _convert_;

  }));

  it('should be able to convert an array to a string', function () {

    var key = [84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 107, 101, 121, 48, 48, 48];

    var s = convert.arrayToString(key);

    expect(s).toBe('This is a key000');

  });

  it('should be able to convert a string to a decimal array', function () {

    var s = 'This is a key000';

    var t = convert.stringToArray(s);

    expect(t[0]).toBe(84);
    expect(t[15]).toBe(48);
    expect(t[16]).toBeUndefined();

  });

  it('should return an array of hex values', function () {

    var a = [0, 5, 10, 16];

    var output = convert.arrayToHex(a);

    expect(output[0]).toBe('0');
    expect(output[1]).toBe('5');
    expect(output[2]).toBe('a');
    expect(output[3]).toBe('10');

  });

});
