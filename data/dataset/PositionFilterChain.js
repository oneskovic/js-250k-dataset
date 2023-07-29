/*global runtime, core*/
/*jslint emptyblock: true, unparam: true*/

/**
 * A structure that acts like a filter for all purposes,
 * and also can be combined with other instances of it's own kind or other filters.
 * @constructor
 * @implements {core.PositionFilter}
 */
core.PositionFilterChain = function PositionFilterChain() {
    "use strict";

    var /**@type{!Array.<!core.PositionFilter|!core.PositionFilterChain>}*/
        filterChain = [],
        /**@const*/
        FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT,
        /**@const*/
        FILTER_REJECT  = core.PositionFilter.FilterResult.FILTER_REJECT;

    /**
     * Returns accept if all filters in the chain accept the position, else reject.
     * @param {!core.PositionIterator} iterator
     * @return {!core.PositionFilter.FilterResult}
     */
    this.acceptPosition = function (iterator) {
        var i;
        for (i = 0; i < filterChain.length; i += 1) {
            if (filterChain[i].acceptPosition(iterator) === FILTER_REJECT) {
                return FILTER_REJECT;
            }
        }
        return FILTER_ACCEPT;
    };

    /**
     * Adds a filter to the filter chain.
     * @param {!core.PositionFilter|!core.PositionFilterChain} filterInstance
     * @return {undefined}
     */
    this.addFilter = function (filterInstance) {
        filterChain.push(filterInstance);
    };

};
