// Declare dependencies
/* global fluid */

// TODO: This is a very old-style file that is largely kept around for reference purposes, and
// has largely been supplanted by new support for bubbling focus events in more recent versions
// of jQuery - please communicate with the Fluid team if you find yourself thinking of using it

(function () {
    "use strict";

    fluid.debug = (function () {

        var outputEventDetails = function (eventType, event, caughtBy) {
            fluid.log(new Date() + " " + eventType + " was called on target " + fluid.dumpEl(event.target) + ", caught by " + fluid.dumpEl(caughtBy));
        };

        var focusOutputter = function (evt) {
            outputEventDetails("Focus", evt, this);
        };

        var blurOutputter = function (evt) {
            outputEventDetails("Blur", evt, this);
        };

        var addFocusChangeListeners = function (jQueryElements) {
            jQueryElements.focus(focusOutputter);
            jQueryElements.blur(blurOutputter);
        };

        return {
            listenForFocusEvents: function (context) {
                fluid.setLogging(true);
                var focussableElements  = [];

                var everything = context ? jQuery("*", context) : jQuery("*");
                fluid.log("Everything: " + everything.length);
                everything.each(function () {
                   //if (jQuery(this).hasTabindex()) {
                    focussableElements.push(this);
                  // }
                });

                addFocusChangeListeners(jQuery(focussableElements));
            }
        }; // End of public return.
    }) (); // End of fluid.debug namespace.

    // Call listenForFocusEvents when the document is ready.
    jQuery(document).ready(function () {
        fluid.debug.listenForFocusEvents();
    });
})();
