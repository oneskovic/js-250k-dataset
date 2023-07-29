define(function() {
    'use strict';

    /**
     * @classdesc
     *
     * Select easing functions from http://www.robertpenner.com/easing/.
     *
     * Each property of this module returns the CSS cubic beizer representing
     * the easing function, and a JavaScript implementation of the function.
     * The reason for both is that some browsers (IE9) do not support CSS Transitions,
     * so we need to use a fallback JavaScript easing function.
     *
     * @exports EasingFunctions
     *
     * @example
     *
     * var fn = EasingFunctions.easeOutQuart.js;
     * var start = new Date();
     * var elapsed = 0;
     * var duration = 500;
     * var value;
     *
     * // Ease a single value from 0 to 1.
     * while (elapsed < duration) {
     *     value = fn(0, 1, duration, elapsed);
     *     elapsed = new Date() - start;
     * }
     */
    var EasingFunctions = {

        /**
         * See {@link http://easings.net/#easeOutCubic}.
         */
        easeOutCubic: {
            css: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            js: function(start, delta, duration, elapsed) {
                elapsed = elapsed / duration - 1;
                return delta * (elapsed * elapsed * elapsed + 1) + start;
            }
        },

        /**
         * See {@link http://easings.net/#easeOutQuart}.
         */
        easeOutQuart: {
            css: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            js: function(start, delta, duration, elapsed) {
                elapsed = elapsed / duration - 1;
                return -delta * (elapsed * elapsed * elapsed * elapsed - 1) + start;
            }
        }
    };

    return EasingFunctions;
});
