/**
 * @fileoverview Client positioning class.
 *
*
*
 */

goog.provide('goog.positioning.ClientPosition');

goog.require('goog.math.Box');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('goog.positioning');
goog.require('goog.positioning.AbstractPosition');



/**
 * Encapsulates a popup position where the popup is positioned relative to the
 * window (client) coordinates. This calculates the correct position to
 * use even if the element is relatively positioned to some other element. This
 * is for trying to position an element at the spot of the mouse cursor in
 * a MOUSEMOVE event. Just use the event.clientX and event.clientY as the
 * parameters.
 *
 * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position.
 * @constructor
 * @extends {goog.positioning.AbstractPosition}
 */
goog.positioning.ClientPosition = function(arg1, opt_arg2) {
  /**
   * Coordinate to position popup at.
   * @type {goog.math.Coordinate}
   */
  this.coordinate = arg1 instanceof goog.math.Coordinate ? arg1 :
      new goog.math.Coordinate(/** @type {number} */ (arg1), opt_arg2);
};
goog.inherits(goog.positioning.ClientPosition,
              goog.positioning.AbstractPosition);


/**
 * Repositions the popup according to the current state
 *
 * @param {Element} element The DOM element of the popup.
 * @param {goog.positioning.Corner} popupCorner The corner of the popup
 *     element that that should be positioned adjacent to the anchorElement.
 *     One of the goog.positioning.Corner constants.
 * @param {goog.math.Box=} opt_margin A margin specified in pixels.
 * @param {goog.math.Size=} opt_preferredSize Preferred size of the element.
 */
goog.positioning.ClientPosition.prototype.reposition = function(
    element, popupCorner, opt_margin, opt_preferredSize) {

  var viewportElt = goog.style.getClientViewportElement(element);
  var clientPos = new goog.math.Coordinate(
      this.coordinate.x + viewportElt.scrollLeft,
      this.coordinate.y + viewportElt.scrollTop);
  goog.positioning.positionAtAnchor(
      viewportElt, goog.positioning.Corner.TOP_LEFT, element, popupCorner,
      clientPos, opt_margin, null, opt_preferredSize);
};
