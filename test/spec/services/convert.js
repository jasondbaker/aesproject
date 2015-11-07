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

  it('should convert a string containing hex to a decimal array', function() {

    var s = '000102030405060708090a';

    var output = convert.hexToArray(s);

    expect(output[0]).toBe(0);
    expect(output[10]).toBe(10);

    s = '00 01 02 03 04 05 06 07 08 09 0a';

    output = convert.hexToArray(s);

    expect(output[0]).toBe(0);
    expect(output[10]).toBe(10);

    s = '00010203040506070809f';

    output = convert.hexToArray(s);

    expect(output[0]).toBe(0);
    expect(output[10]).toBe(15);

    s = 'BADHEX';

    output = convert.hexToArray(s);

    expect(output[0]).toBeUndefined();

    s = '';

    output = convert.hexToArray(s);

    expect(output[0]).toBeUndefined();

  });

});
