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
    var multiplicationMatrix = [
      [0x02, 0x03, 0x01, 0x01],
      [0x01, 0x02, 0x03, 0x01],
      [0x01, 0x01, 0x02, 0x03],
      [0x03, 0x01, 0x01, 0x02]
    ];

    stateCol = aes.mixColumn(stateCol, 0, multiplicationMatrix);

    expect(stateCol[0]).toBe(0x04);
    expect(stateCol[1]).toBe(0x66);
    expect(stateCol[2]).toBe(0x81);
    expect(stateCol[3]).toBe(0xE5);
  });

  it('should mix a column for decryption', function () {
    var stateCol = [0x04, 0x66, 0x81, 0xE5];
    var inverseMultiplicationMatrix = [
      [0x0E, 0x0B, 0x0D, 0x09],
      [0x09, 0x0E, 0x0B, 0x0D],
      [0x0D, 0x09, 0x0E, 0x0B],
      [0x0B, 0x0D, 0x09, 0x0E]
    ];

    stateCol = aes.mixColumn(stateCol, 0, inverseMultiplicationMatrix);

    expect(stateCol[0]).toBe(0xD4);
    expect(stateCol[1]).toBe(0xBF);
    expect(stateCol[2]).toBe(0x5D);
    expect(stateCol[3]).toBe(0x30);
  });

  it('should mix all columns in current state for encryption', function () {

    var state = [
                  [0xD4, 0xE0, 0xB8, 0x1E],
                  [0xBF, 0xB4, 0x41, 0x27],
                  [0x5D, 0x52, 0x11, 0x98],
                  [0x30, 0xAE, 0xF1, 0xE5]
                ];

    state = aes.mixState(state, false);

    expect(state[0][0]).toBe(0x04);
    expect(state[1][0]).toBe(0x66);
    expect(state[2][0]).toBe(0x81);
    expect(state[3][0]).toBe(0xE5);

    expect(state[0][1]).toBe(0xE0);
    expect(state[1][1]).toBe(0xCB);
    expect(state[2][1]).toBe(0x19);
    expect(state[3][1]).toBe(0x9A);

    expect(state[0][2]).toBe(0x48);
    expect(state[1][2]).toBe(0xF8);
    expect(state[2][2]).toBe(0xD3);
    expect(state[3][2]).toBe(0x7A);

    expect(state[0][3]).toBe(0x28);
    expect(state[1][3]).toBe(0x06);
    expect(state[2][3]).toBe(0x26);
    expect(state[3][3]).toBe(0x4C);
  });

  it('should mix all columns in current state for decryption', function () {

    var state = [
                  [0x04,0xE0,0x48,0x28],
                  [0x66,0xCB,0xF8,0x06],
                  [0x81,0x19,0xD3,0x26],
                  [0xE5,0x9A,0x7A,0x4C]
                ];

    state = aes.mixState(state, true);

    expect(state[0][0]).toBe(0xD4);
    expect(state[1][0]).toBe(0xBF);
    expect(state[2][0]).toBe(0x5D);
    expect(state[3][0]).toBe(0x30);

    expect(state[0][1]).toBe(0xE0);
    expect(state[1][1]).toBe(0xB4);
    expect(state[2][1]).toBe(0x52);
    expect(state[3][1]).toBe(0xAE);

    expect(state[0][2]).toBe(0xB8);
    expect(state[1][2]).toBe(0x41);
    expect(state[2][2]).toBe(0x11);
    expect(state[3][2]).toBe(0xF1);

    expect(state[0][3]).toBe(0x1E);
    expect(state[1][3]).toBe(0x27);
    expect(state[2][3]).toBe(0x98);
    expect(state[3][3]).toBe(0xE5);
  });

  it('should add a round key', function () {

    var state = [
                  [0x54,0x4F,0x4E,0x20],
                  [0x77,0x6E,0x69,0x54],
                  [0x6F,0x65,0x6E,0x77],
                  [0x20,0x20,0x65,0x6F]
                ];

    var key = [0x54,0x68,0x61,0x74,0x73,0x20,0x6D,0x79,0x20,0x4B,0x75,0x6E,0x67,0x20,0x46,0x75];

    state = aes.addRoundKey(state, key);

    expect(state[0][0]).toBe(0x00);
    expect(state[1][0]).toBe(0x1F);
    expect(state[2][0]).toBe(0x0E);
    expect(state[3][0]).toBe(0x54);

    expect(state[0][1]).toBe(0x3C);
    expect(state[1][1]).toBe(0x4E);
    expect(state[2][1]).toBe(0x08);
    expect(state[3][1]).toBe(0x59);

    expect(state[0][2]).toBe(0x6E);
    expect(state[1][2]).toBe(0x22);
    expect(state[2][2]).toBe(0x1B);
    expect(state[3][2]).toBe(0x0B);

    expect(state[0][3]).toBe(0x47);
    expect(state[1][3]).toBe(0x74);
    expect(state[2][3]).toBe(0x31);
    expect(state[3][3]).toBe(0x1A);
  });

  it('should rotate a word', function () {

    var word = [1,2,3,4];

    word = aes.rotWord(word);

    expect(word[0]).toBe(2);
    expect(word[1]).toBe(3);
    expect(word[2]).toBe(4);
    expect(word[3]).toBe(1);

  });

  it('should use a sbox on a word during encryption', function () {

    var word = [0x20, 0x46, 0x75, 0x67];

    word = aes.subWord(word, false);

    expect(word[0]).toBe(0xB7);
    expect(word[1]).toBe(0x5A);
    expect(word[2]).toBe(0x9D);
    expect(word[3]).toBe(0x85);

  });

  it('should use a sbox on a word during decryption', function () {

    var word = [0xB7, 0x5A, 0x9D, 0x85];

    word = aes.subWord(word, true);

    expect(word[0]).toBe(0x20);
    expect(word[1]).toBe(0x46);
    expect(word[2]).toBe(0x75);
    expect(word[3]).toBe(0x67);

  });

  it('should return an offset key', function () {

    var key = [
      0x00,0x01,0x02,0x03,
      0x04,0x05,0x06,0x07,
      0x08,0x09,0x0A,0x0B,
      0x0C,0x0D,0x0E,0x0F
    ];

    var newKey = aes.keyOffset(key, 0);

    expect(newKey[0]).toBe(0x00);
    expect(newKey[3]).toBe(0x03);

  });

  it('should return a round constant value', function () {


    var rcon = aes.roundCon(0);

    expect(rcon[0]).toBe(0x01);
    expect(rcon[1]).toBe(0x00);
    expect(rcon[2]).toBe(0x00);
    expect(rcon[3]).toBe(0x00);

  });

  it('should properly xor two words', function () {

    var word1 = [1, 2, 3, 1];
    var word2 = [1, 2, 3, 2];

    var newWord = aes.xorWords(word1, word2);

    expect(newWord[0]).toBe(0x00);
    expect(newWord[1]).toBe(0x00);
    expect(newWord[2]).toBe(0x00);
    expect(newWord[3]).toBe(0x03);

  });

  it('should return an array of hex values', function () {

    var a = [0, 5, 10, 16];

    var output = aes.arrayToHex(a);

    expect(output[0]).toBe('0');
    expect(output[1]).toBe('5');
    expect(output[2]).toBe('a');
    expect(output[3]).toBe('10');

  });

  it('should expand a key', function () {

    var key = [
      0x54,0x68,0x61,0x74,
      0x73,0x20,0x6D,0x79,
      0x20,0x4B,0x75,0x6E,
      0x67,0x20,0x46,0x75
    ];

    var newKey = aes.expandKey(key);

    expect(newKey[0]).toBe(0x54);
    expect(newKey[15]).toBe(0x75);
    expect(newKey[16]).toBe(0xe2);
    expect(newKey[175]).toBe(0x26);

  });

});
