/*global gui*/
/*jslint emptyblock: true, unparam: true*/

/**
 * An interface for rendering a visible selection for the provided cursor
 * @interface
 * @param {!(ops.OdtCursor|gui.ShadowCursor)} cursor
 */
gui.SelectionView = function SelectionView(cursor) { "use strict"; };

/**
 * Rerender the selection overlay
 * @return {undefined}
 */
gui.SelectionView.prototype.rerender = function() { "use strict"; };

/**
 * Show selection overlay
 * @return {undefined}
 */
gui.SelectionView.prototype.show = function() { "use strict"; };
/**
 * Hide selection overlay
 * @return {undefined}
 */
gui.SelectionView.prototype.hide = function() { "use strict"; };

/**
 * Clear all overlay from the DOM
 * @param {function(!Error=)} callback
 * @return {undefined}
 */
gui.SelectionView.prototype.destroy = function (callback) { "use strict"; };
