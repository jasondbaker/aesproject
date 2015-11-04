'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('aesApp'));

  var MainCtrl,
    scope,
    aes;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _aes_) {
    scope = $rootScope.$new();
    aes = _aes_;

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  //it('should return valid result for foo', function () {
  //  expect(scope.foo).toBe(2);
  //});
});
