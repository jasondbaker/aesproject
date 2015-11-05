'use strict';

describe('Service: aes', function () {

  // load the controller's module
  beforeEach(module('aesApp'));

  var $rootScope,
    scope,
    aes;

  beforeEach(inject(function (_$rootScope_, _aes_) {
    $rootScope = _$rootScope_;
    aes = _aes_;
    scope = $rootScope.$new();

  }));

  it('should replace value based on substitution box', function () {
    var state = [
                  [1,5,9,13],
                  [2,6,10,14],
                  [3,7,11,15],
                  [4,8,12,16]
                ];

    state = aes.substitutionBox(state,false);

    expect(state[0][0]).toBe(0x7c);
    expect(state[1][0]).toBe(0x77);
    expect(state[3][3]).toBe(0xca);

  });

  it('should replace value based on reverse substitution box', function () {
    var state = [
                  [1,5,9,13],
                  [2,6,10,14],
                  [3,7,11,15],
                  [4,8,12,16]
                ];

    state = aes.substitutionBox(state,true);

    expect(state[0][0]).toBe(0x09);
    expect(state[1][0]).toBe(0x6a);
    expect(state[3][3]).toBe(0x7c);

  });

  it('should shift rows', function () {
    var state = [
                  [1,5,9,13],
                  [2,6,10,14],
                  [3,7,11,15],
                  [4,8,12,16]
                ];

    state = aes.shiftRows(state, false);

    expect(state[0][0]).toBe(1);
    expect(state[0][3]).toBe(13);
    expect(state[1][0]).toBe(6);
    expect(state[1][3]).toBe(2);
    expect(state[2][0]).toBe(11);
    expect(state[2][3]).toBe(7);
    expect(state[3][0]).toBe(16);
    expect(state[3][3]).toBe(12);
  });

  it('should shift rows in reverse', function () {
    var state = [
                  [1,5,9,13],
                  [2,6,10,14],
                  [3,7,11,15],
                  [4,8,12,16]
                ];

    state = aes.shiftRows(state, true);

    expect(state[0][0]).toBe(1);
    expect(state[0][3]).toBe(13);
    expect(state[1][0]).toBe(14);
    expect(state[1][3]).toBe(10);
    expect(state[2][0]).toBe(11);
    expect(state[2][3]).toBe(7);
    expect(state[3][0]).toBe(8);
    expect(state[3][3]).toBe(4);
  });

  it('should mix a column for encryption', function () {
    var stateCol = [0xD4, 0xBF, 0x5D, 0x30];

    stateCol = aes.mixColumn(stateCol, 0, false);

    expect(stateCol[0]).toBe(0x04);
    expect(stateCol[1]).toBe(0x66);
    expect(stateCol[2]).toBe(0x81);
    expect(stateCol[3]).toBe(0xE5);
  });

  it('should mix a column for decryption', function () {
    var stateCol = [0x04, 0x66, 0x81, 0xE5];

    stateCol = aes.mixColumn(stateCol, 0, true);

    expect(stateCol[0]).toBe(0xD4);
    expect(stateCol[1]).toBe(0xBF);
    expect(stateCol[2]).toBe(0x5D);
    expect(stateCol[3]).toBe(0x30);
  });

});
