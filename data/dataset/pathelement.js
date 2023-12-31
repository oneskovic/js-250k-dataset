/**
 * @fileoverview A thin wrapper around the DOM element for paths.
 * @author arv@google.com (Erik Arvidsson)
 * @author yoah@google.com (Yoah Bar-David)
 */


goog.provide('goog.graphics.PathElement');

goog.require('goog.graphics.StrokeAndFillElement');



/**
 * Interface for a graphics path element.
 * You should not construct objects from this constructor. The graphics
 * will return an implementation of this interface for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
 *     this element.
 * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.StrokeAndFillElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
goog.graphics.PathElement = function(element, graphics, stroke, fill) {
  goog.graphics.StrokeAndFillElement.call(this, element, graphics, stroke,
      fill);
};
goog.inherits(goog.graphics.PathElement, goog.graphics.StrokeAndFillElement);


/**
 * Update the underlying path.
 * @param {!goog.graphics.Path} path The path object to draw.
 */
goog.graphics.PathElement.prototype.setPath = goog.abstractMethod;
