'use strict';

describe('Service: aes', function () {

  // load the controller's module
  beforeEach(module('aesApp'));

  var $rootScope,
    scope,
    aes,
    convert;

  beforeEach(inject(function (_$rootScope_, _aes_, _convert_) {
    $rootScope = _$rootScope_;
    aes = _aes_;
    convert = _convert_;
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

    var key = [0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D,0x0E,0x0F];

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

  it('should expand a 128-bit key', function () {

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

    // official NIST 128-bit cipher key expansion test (FIPS-197)
    key = [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
      0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c];

    newKey = aes.expandKey(key);

    expect(newKey[0]).toBe(0x2b);
    expect(newKey[175]).toBe(0xa6);
    expect(newKey.length).toBe(176);

  });

  it('should expand a 192-bit key', function () {


    // official NIST 192-bit cipher key expansion test (FIPS-197)
    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a,
          0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15,
          0x16, 0x17
     ];

    var newKey = aes.expandKey(key);

    expect(newKey[0]).toBe(0x00);
    expect(newKey[207]).toBe(0x5d);
    expect(newKey.length).toBe(208);

  });

  it('should expand a 256-bit key', function () {


    // official NIST 192-bit cipher key expansion test (FIPS-197)
    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a,
          0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15,
          0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f
     ];

    var newKey = aes.expandKey(key);

    expect(newKey[0]).toBe(0x00);
    expect(newKey[239]).toBe(0x36);
    expect(newKey.length).toBe(240);

  });

  it('should get a round key based on the expanded key for encryption', function () {

    var expKey = [
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
      16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
      32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47
    ];

    var roundKey = aes.getRoundKey(expKey,-1,false);

    expect(roundKey[0]).toBe(0);
    expect(roundKey[15]).toBe(15);

    roundKey = aes.getRoundKey(expKey,0,false);

    expect(roundKey[0]).toBe(16);
    expect(roundKey[15]).toBe(31);

    roundKey = aes.getRoundKey(expKey,1,false);

    expect(roundKey[0]).toBe(32);
    expect(roundKey[15]).toBe(47);

  });

  it('should get a round key based on the expanded key for decryption', function () {

    var expKey = [
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
      16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
      32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47
    ];

    var roundKey = aes.getRoundKey(expKey,-1,true);

    expect(roundKey[0]).toBe(32);
    expect(roundKey[15]).toBe(47);

    roundKey = aes.getRoundKey(expKey,0,true);

    expect(roundKey[0]).toBe(16);
    expect(roundKey[15]).toBe(31);

    roundKey = aes.getRoundKey(expKey,1,true);

    expect(roundKey[0]).toBe(0);
    expect(roundKey[15]).toBe(15);

  });

  it('should be able to encrypt a message with a 128-bit key', function () {

    // official NIST AES-128 test (FIPS-197)
    var message = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
       0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F];

    var cipherText = convert.arrayToHex(aes.encrypt(message, key).ciphertext);

    expect(cipherText[0]).toBe('69');
    expect(cipherText[1]).toBe('c4');
    expect(cipherText[2]).toBe('e0');
    expect(cipherText[3]).toBe('d8');
    expect(cipherText[4]).toBe('6a');
    expect(cipherText[5]).toBe('7b');
    expect(cipherText[6]).toBe('4');
    expect(cipherText[7]).toBe('30');
    expect(cipherText[8]).toBe('d8');
    expect(cipherText[9]).toBe('cd');
    expect(cipherText[10]).toBe('b7');
    expect(cipherText[11]).toBe('80');
    expect(cipherText[12]).toBe('70');
    expect(cipherText[13]).toBe('b4');
    expect(cipherText[14]).toBe('c5');
    expect(cipherText[15]).toBe('5a');

  });

  it('should be able to encrypt a message with a 192-bit key', function () {

    // official NIST AES-192 test (FIPS-197)
    var message = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
       0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13,
      0x14, 0x15, 0x16, 0x17];

    var cipherText = convert.arrayToHex(aes.encrypt(message, key).ciphertext);

    expect(cipherText[0]).toBe('dd');
    expect(cipherText[1]).toBe('a9');
    expect(cipherText[2]).toBe('7c');
    expect(cipherText[3]).toBe('a4');
    expect(cipherText[4]).toBe('86');
    expect(cipherText[5]).toBe('4c');
    expect(cipherText[6]).toBe('df');
    expect(cipherText[7]).toBe('e0');
    expect(cipherText[8]).toBe('6e');
    expect(cipherText[9]).toBe('af');
    expect(cipherText[10]).toBe('70');
    expect(cipherText[11]).toBe('a0');
    expect(cipherText[12]).toBe('ec');
    expect(cipherText[13]).toBe('d');
    expect(cipherText[14]).toBe('71');
    expect(cipherText[15]).toBe('91');

  });

  it('should be able to encrypt a message with a 256-bit key', function () {

    // official NIST AES-256 test (FIPS-197)
    var message = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
       0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13,
      0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f];

    var cipherText = convert.arrayToHex(aes.encrypt(message, key).ciphertext);

    expect(cipherText[0]).toBe('8e');
    expect(cipherText[1]).toBe('a2');
    expect(cipherText[2]).toBe('b7');
    expect(cipherText[3]).toBe('ca');
    expect(cipherText[4]).toBe('51');
    expect(cipherText[5]).toBe('67');
    expect(cipherText[6]).toBe('45');
    expect(cipherText[7]).toBe('bf');
    expect(cipherText[8]).toBe('ea');
    expect(cipherText[9]).toBe('fc');
    expect(cipherText[10]).toBe('49');
    expect(cipherText[11]).toBe('90');
    expect(cipherText[12]).toBe('4b');
    expect(cipherText[13]).toBe('49');
    expect(cipherText[14]).toBe('60');
    expect(cipherText[15]).toBe('89');

  });

  it('should be able to decrypt a message using a 128-bit key', function () {

    // official NIST AES-128 test (FIPS-197)
    var message = [0x69, 0xc4, 0xe0, 0xd8, 0x6a, 0x7b, 0x04, 0x30,
       0xd8, 0xcd, 0xb7, 0x80, 0x70, 0xb4, 0xc5, 0x5a];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F];

    var plaintext = convert.arrayToHex(aes.decrypt(message, key));

    expect(plaintext[0]).toBe('0');
    expect(plaintext[1]).toBe('11');
    expect(plaintext[2]).toBe('22');
    expect(plaintext[3]).toBe('33');
    expect(plaintext[4]).toBe('44');
    expect(plaintext[5]).toBe('55');
    expect(plaintext[6]).toBe('66');
    expect(plaintext[7]).toBe('77');
    expect(plaintext[8]).toBe('88');
    expect(plaintext[9]).toBe('99');
    expect(plaintext[10]).toBe('aa');
    expect(plaintext[11]).toBe('bb');
    expect(plaintext[12]).toBe('cc');
    expect(plaintext[13]).toBe('dd');
    expect(plaintext[14]).toBe('ee');
    expect(plaintext[15]).toBe('ff');

  });

  it('should be able to decrypt a message using a 192-bit key', function () {

    // official NIST AES-192 test (FIPS-197)
    var message = [0xdd, 0xa9, 0x7c, 0xa4, 0x86, 0x4c, 0xdf, 0xe0,
       0x6e, 0xaf, 0x70, 0xa0, 0xec, 0x0d, 0x71, 0x91];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
       0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13,
       0x14, 0x15, 0x16, 0x17];

    var plaintext = convert.arrayToHex(aes.decrypt(message, key));

    expect(plaintext[0]).toBe('0');
    expect(plaintext[1]).toBe('11');
    expect(plaintext[2]).toBe('22');
    expect(plaintext[3]).toBe('33');
    expect(plaintext[4]).toBe('44');
    expect(plaintext[5]).toBe('55');
    expect(plaintext[6]).toBe('66');
    expect(plaintext[7]).toBe('77');
    expect(plaintext[8]).toBe('88');
    expect(plaintext[9]).toBe('99');
    expect(plaintext[10]).toBe('aa');
    expect(plaintext[11]).toBe('bb');
    expect(plaintext[12]).toBe('cc');
    expect(plaintext[13]).toBe('dd');
    expect(plaintext[14]).toBe('ee');
    expect(plaintext[15]).toBe('ff');

  });

  it('should be able to decrypt a message using a 256-bit key', function () {

    // official NIST AES-256 test (FIPS-197)
    var message = [0x8e, 0xa2, 0xb7, 0xca, 0x51, 0x67, 0x45, 0xbf,
       0xea, 0xfc, 0x49, 0x90, 0x4b, 0x49, 0x60, 0x89];

    var key = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
     0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13,
     0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f];

    var plaintext = convert.arrayToHex(aes.decrypt(message, key));

    expect(plaintext[0]).toBe('0');
    expect(plaintext[1]).toBe('11');
    expect(plaintext[2]).toBe('22');
    expect(plaintext[3]).toBe('33');
    expect(plaintext[4]).toBe('44');
    expect(plaintext[5]).toBe('55');
    expect(plaintext[6]).toBe('66');
    expect(plaintext[7]).toBe('77');
    expect(plaintext[8]).toBe('88');
    expect(plaintext[9]).toBe('99');
    expect(plaintext[10]).toBe('aa');
    expect(plaintext[11]).toBe('bb');
    expect(plaintext[12]).toBe('cc');
    expect(plaintext[13]).toBe('dd');
    expect(plaintext[14]).toBe('ee');
    expect(plaintext[15]).toBe('ff');

  });

  it('should be able to parse a 128-bit ASCII key', function () {

    var key = convert.stringToArray('This is a key');

    var newKey = aes.parseKey(key, 16).key;

    expect(newKey[0]).toBe(84);
    expect(newKey[15]).toBe(0);
    expect(newKey[16]).toBeUndefined();
  });

  it('should be able to parse a 192-bit ASCII key', function () {

    var key = convert.stringToArray('This is a longer key');

    var newKey = aes.parseKey(key, 24).key;

    expect(newKey[0]).toBe(84);
    expect(newKey[23]).toBe(0);
    expect(newKey[24]).toBeUndefined();
  });

  it('should be able to parse a 256-bit ASCII key', function () {

    var key = convert.stringToArray('This is a much much longer key');

    var newKey = aes.parseKey(key, 32).key;
    expect(newKey[0]).toBe(84);
    expect(newKey[31]).toBe(0);
    expect(newKey[32]).toBeUndefined();
  });

  it('should properly truncate an ASCII key', function () {

    var key = convert.stringToArray('This key is way too long');

    var newKey = aes.parseKey(key, 16).key;
    expect(newKey[0]).toBe(84);
    expect(newKey[15]).toBe(32);
    expect(newKey[16]).toBeUndefined();
  });

});
