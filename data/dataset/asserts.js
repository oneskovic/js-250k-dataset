goog.provide('shaka.asserts');





/**
 * @define {boolean} true to enable asserts, false otherwise.
 */
goog.define('shaka.asserts.ENABLE_ASSERTS', goog.DEBUG);


/** @type {function()|function(*, string=)} */
shaka.asserts.assert = function() {};


/** @type {function()} */
shaka.asserts.notImplemented = function() {};


/** @type {function()} */
shaka.asserts.unreachable = function() {};


// Install assert functions.
if (shaka.asserts.ENABLE_ASSERTS) {
  shaka.asserts.assert =
      console.assert.bind(console);

  shaka.asserts.notImplemented =
      console.assert.bind(console, 0 == 1, 'Not implemented.');

  shaka.asserts.unreachable =
      console.assert.bind(console, 0 == 1, 'Unreachable reached.');
}

