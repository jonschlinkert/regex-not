'use strict';

require('mocha');
var assert = require('assert');
var not = require('./');

describe('regex-not', function() {
  it('should export a function', function() {
    assert.equal(typeof not, 'function');
  });

  it('should create a negation regex', function() {
    var re = not('foo');
    assert.deepEqual(re, /^(?:(?!^(?:foo)$).)*$/);
    assert.equal(re.test('foo'), false);
    assert.equal(re.test('bar'), true);
    assert.equal(re.test('foobar'), true);
    assert.equal(re.test('barfoo'), true);
  });

  it('should create a loose negation regex when `options.contains` is true', function() {
    assert.deepEqual(not('foo', {contains: true}), /^(?:(?!(?:foo)).)*$/);
    assert.equal(not('foo', {contains: true}).test('foo'), false);
    assert.equal(not('foo', {contains: true}).test('bar'), true);
    assert.equal(not('foo', {contains: true}).test('foobar'), false);
    assert.equal(not('foo', {contains: true}).test('barfoo'), false);
  });

  it('should create a loose negation regex when `options.strictNegate` is false', function() {
    assert.deepEqual(not('foo', {strictNegate: false}), /^(?:(?!(?:foo)).)*$/);
    assert.equal(not('foo', {strictNegate: false}).test('foo'), false);
    assert.equal(not('foo', {strictNegate: false}).test('bar'), true);
    assert.equal(not('foo', {strictNegate: false}).test('foobar'), false);
    assert.equal(not('foo', {strictNegate: false}).test('barfoo'), false);
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      not();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string');
      cb();
    }
  });
});
