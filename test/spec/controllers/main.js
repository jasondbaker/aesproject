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


});
