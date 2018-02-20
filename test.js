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
    assert.deepEqual(re, /^(?:(?!^(?:foo)$).)+$/);
    assert.equal(re.test('foo'), false);
    assert.equal(re.test('bar'), true);
    assert.equal(re.test('foobar'), true);
    assert.equal(re.test('barfoo'), true);
  });

  it('should create a loose negation regex when `options.contains` is true', function() {
    assert.deepEqual(not('foo', {contains: true}), /^(?:(?!(?:foo)).)+$/);
    assert.equal(not('foo', {contains: true}).test('foo'), false);
    assert.equal(not('foo', {contains: true}).test('bar'), true);
    assert.equal(not('foo', {contains: true}).test('foobar'), false);
    assert.equal(not('foo', {contains: true}).test('barfoo'), false);
  });

  it('should create a loose negation regex when `options.strictNegate` is false', function() {
    var opts = {strictNegate: false};
    assert.deepEqual(not('foo', opts), /^(?:(?!(?:foo)).)+$/);
    assert.equal(not('foo', opts).test('foo'), false);
    assert.equal(not('foo', opts).test('bar'), true);
    assert.equal(not('foo', opts).test('foobar'), false);
    assert.equal(not('foo', opts).test('barfoo'), false);
  });

  it('should support `options.endChar`', function() {
    var opts = {endChar: '*'};
    assert.deepEqual(not('foo', opts), /^(?:(?!^(?:foo)$).)*$/);
    assert.deepEqual(not('foo', opts).exec('foo'), null);
    assert.equal(not('foo', opts).test('foo'), false);
    assert.equal(not('foo', opts).test('bar'), true);
    assert.equal(not('foo', opts).test('foobar'), true);
    assert.equal(not('foo', opts).test('barfoo'), true);
  });

  it('should throw when a potentially unsafe regex is passed', function() {
    assert.throws(function() {
      not('(x+x+)+y', { safe: true });
    }, /potentially unsafe/);
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      not();
    }, /expected/);
  });
});
