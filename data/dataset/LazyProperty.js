/*global core*/

// TODO Apparently newer closure compilers do a better job with generics

/**
 * Lazily loaded property. The value is loaded using the valueLoader and cached
 * the first time it's requested. Subsequent requests will return the cached value.
 * Calling reset will clear the cached value, causing the next value request
 * to load a new value via the valueLoader.
 *
 * @constructor
 * @template T
 * @param {!function():Object} valueLoader Property value loader
 */
core.LazyProperty = function (valueLoader) {
    "use strict";
    var cachedValue,
        valueLoaded = false;

    /**
     * @return {T}
     */
    this.value = function() {
        if (!valueLoaded) {
            cachedValue = valueLoader();
            valueLoaded = true;
        }
        return cachedValue;
    };

    /**
     * @return {undefined}
     */
    this.reset = function() {
        valueLoaded = false;
    };
};
