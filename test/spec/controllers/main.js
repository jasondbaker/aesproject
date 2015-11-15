'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('aesApp'));

  var MainCtrl,
    scope,
    convert,
    aes;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _aes_, _convert_) {
    scope = $rootScope.$new();
    aes = _aes_;
    convert = _convert_;

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should toggle ascii display', function () {

    expect(scope.decryption.plaintext.displayAscii).toBe(false);
    scope.toggleAscii();
    expect(scope.decryption.plaintext.displayAscii).toBe(true);
  });

  it('should copy values from encryption to decryption values', function () {

    scope.encryption.key.parsedKey = [0, 1, 2, 3];
    scope.encryption.ciphertext.value = [4, 5, 6, 7];
    scope.decryption.key.type = 'ascii';

    scope.copyFromEncrypt();

    expect(scope.decryption.key.value[2]).toBe(2);
    expect(scope.decryption.ciphertext.value[2]).toBe(6);
    expect(scope.decryption.key.type).toBe('hex');

  });

  it('should set the type for a specified input', function () {

    scope.encryption.key.type = 'ascii';
    scope.setType('encryption','key','hex');
    expect(scope.encryption.key.type).toBe('hex');

    scope.decryption.key.type = 'ascii';
    scope.setType('decryption','key','hex');
    expect(scope.decryption.key.type).toBe('hex');

  });

  it('should clear the specified form input values', function () {

    scope.encryption.key.value = 'test';
    scope.encryption.plaintext.value = 'test';
    scope.encryption.ciphertext.value = 'test';
    scope.encryption.result = 'test';
    scope.showDetails = true;

    scope.clear('encryption');

    expect(scope.encryption.key.value).toBe('');
    expect(scope.encryption.plaintext.value).toBe('');
    expect(scope.encryption.ciphertext.value).toBe('');
    expect(scope.encryption.result).toBeUndefined();
    expect(scope.showDetails).toBe(false);

  });

  // aes functions are already tested, this is more like an end-to-end test
  it('should encrypt some data', function () {
    scope.encryption = {
      plaintext: {
        value : '3243f6a8885a308d313198a2e0370734',
        type : 'hex',
        parsedPlaintext : undefined,
        padding: undefined
      },
      key : {
        value : '2b7e151628aed2a6abf7158809cf4f3c',
        type: 'hex',
        padding: undefined,
        parsedKey: undefined,
        expandedKey: undefined
      },
      ciphertext : {
        value : undefined,
        type : 'hex'
      },
      result : undefined,
      type : 'encryption'
    };

    scope.encrypt(scope.encryption.plaintext, scope.encryption.key);

    expect(scope.encryption.key.padding).toBe(0);
    expect(scope.encryption.ciphertext.value).toBe('39 25 84 1d 02 dc 09 fb dc 11 85 97 19 6a 0b 32');

  });

  // aes functions are already tested, this is more like an end-to-end test
  it('should decrypt some data', function () {
    scope.decryption = {
      plaintext: {
        value : undefined,
        type : 'hex',
        displayAscii : false
      },
      key : {
        value : '2b7e151628aed2a6abf7158809cf4f3c',
        type: 'hex',
        padding: undefined,
        parsedKey: undefined,
        expandedKey: undefined
      },
      ciphertext : {
        value : '39 25 84 1d 02 dc 09 fb dc 11 85 97 19 6a 0b 32',
        type : 'hex'
      },
      result : undefined,
      type : 'decryption'
    };

    scope.decrypt(scope.decryption.ciphertext, scope.decryption.key);

    expect(scope.decryption.key.padding).toBe(0);
    expect(scope.decryption.plaintext.value).toBe('32 43 f6 a8 88 5a 30 8d 31 31 98 a2 e0 37 07 34');

  });

});
