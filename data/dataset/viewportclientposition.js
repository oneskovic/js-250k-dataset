/**
 * @fileoverview Client viewport positioning class.
 *
 * @author robbyw@google.com (Robert Walker)
*
 */

goog.provide('goog.positioning.ViewportClientPosition');

goog.require('goog.math.Box');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('goog.positioning.ClientPosition');



/**
 * Encapsulates a popup position where the popup is positioned relative to the
 * window (client) coordinates, and made to stay within the viewport.
 *
 * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position if arg1 is a number representing the
 *     left position, ignored otherwise.
 * @constructor
 * @extends {goog.positioning.ClientPosition}
 */
goog.positioning.ViewportClientPosition = function(arg1, opt_arg2) {
  goog.positioning.ClientPosition.call(this, arg1, opt_arg2);
};
goog.inherits(goog.positioning.ViewportClientPosition,
              goog.positioning.ClientPosition);


/**
 * Repositions the popup according to the current state.
 *
 * @param {Element} element The DOM element of the popup.
 * @param {goog.positioning.Corner} popupCorner The corner of the popup
 *     element that that should be positioned adjacent to the anchorElement.
 *     One of the goog.positioning.Corner constants.
 * @param {goog.math.Box=} opt_margin A margin specified in pixels.
 * @param {goog.math.Size=} opt_preferredSize Preferred size fo the element.
 */
goog.positioning.ViewportClientPosition.prototype.reposition = function(
    element, popupCorner, opt_margin, opt_preferredSize) {
  var viewportElt = goog.style.getClientViewportElement(element);
  var viewport = goog.style.getVisibleRectForElement(viewportElt);
  var scrollEl = goog.dom.getDomHelper(element).getDocumentScrollElement();
  var clientPos = new goog.math.Coordinate(
      this.coordinate.x + scrollEl.scrollLeft,
      this.coordinate.y + scrollEl.scrollTop);

  var failXY = goog.positioning.Overflow.FAIL_X |
               goog.positioning.Overflow.FAIL_Y;
  var corner = popupCorner;

  // Try the requested position.
  var status = goog.positioning.positionAtCoordinate(clientPos, element, corner,
      opt_margin, viewport, failXY, opt_preferredSize);
  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {
    return;
  }

  // Outside left or right edge of viewport, try try to flip it horizontally.
  if (status & goog.positioning.OverflowStatus.FAILED_LEFT ||
      status & goog.positioning.OverflowStatus.FAILED_RIGHT) {
    corner = goog.positioning.flipCornerHorizontal(corner);
  }

  // Outside top or bottom edge of viewport, try try to flip it vertically.
  if (status & goog.positioning.OverflowStatus.FAILED_TOP ||
      status & goog.positioning.OverflowStatus.FAILED_BOTTOM) {
    corner = goog.positioning.flipCornerVertical(corner);
  }

  // Try flipped position.
  status = goog.positioning.positionAtCoordinate(clientPos, element, corner,
      opt_margin, viewport, failXY, opt_preferredSize);
  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {
    return;
  }

  // If that failed, the viewport is simply too small to contain the popup.
  // Revert to the original position.
  goog.positioning.positionAtCoordinate(
      clientPos, element, popupCorner, opt_margin, viewport, undefined,
      opt_preferredSize);
};
