/**
 * @fileoverview Testing utilities for DOM related tests.
 *
 * @author robbyw@google.com (Robby Walker)
 */

goog.provide('goog.testing.graphics');

goog.require('goog.graphics.Path');
goog.require('goog.testing.asserts');


/**
 * Array mapping numeric segment constant to a descriptive character.
 * @type {Array<string>}
 * @private
 */
goog.testing.graphics.SEGMENT_NAMES_ = function() {
  var arr = [];
  arr[goog.graphics.Path.Segment.MOVETO] = 'M';
  arr[goog.graphics.Path.Segment.LINETO] = 'L';
  arr[goog.graphics.Path.Segment.CURVETO] = 'C';
  arr[goog.graphics.Path.Segment.ARCTO] = 'A';
  arr[goog.graphics.Path.Segment.CLOSE] = 'X';
  return arr;
}();


/**
 * Test if the given path matches the expected array of commands and parameters.
 * @param {Array<string|number>} expected The expected array of commands and
 *     parameters.
 * @param {goog.graphics.Path} path The path to test against.
 */
goog.testing.graphics.assertPathEquals = function(expected, path) {
  var actual = [];
  path.forEachSegment(function(seg, args) {
    actual.push(goog.testing.graphics.SEGMENT_NAMES_[seg]);
    Array.prototype.push.apply(actual, args);
  });
  assertEquals(expected.length, actual.length);
  for (var i = 0; i < expected.length; i++) {
    if (goog.isNumber(expected[i])) {
      assertTrue(goog.isNumber(actual[i]));
      assertRoughlyEquals(expected[i], actual[i], 0.01);
    } else {
      assertEquals(expected[i], actual[i]);
    }
  }
};
