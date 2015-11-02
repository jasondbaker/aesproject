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
    var state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,255];

    state = aes.substitutionBox(state,false);

    expect(state[0]).toBe(0x63);
    expect(state[1]).toBe(0x7c);
    expect(state[15]).toBe(0x16);

  });

  it('should replace value based on reverse substitution box', function () {
    var state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,255];

    state = aes.substitutionBox(state,true);

    expect(state[0]).toBe(0x52);
    expect(state[1]).toBe(0x09);
    expect(state[15]).toBe(0x7d);

  });

});
