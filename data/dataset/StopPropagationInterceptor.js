define(function(require) {
    'use strict';

    var _ = require('lodash');
    var InterceptorMixin = require('wf-js-uicomponents/awesome_map/InterceptorMixin');

    /**
     * Creates a new StopPropagationInterceptor for the given {@link ScrollList}.
     *
     * @classdesc
     *
     * The StopPropagationInterceptor prevents handling of events on a list map.
     *
     * @name StopPropagationInterceptor
     * @constructor
     * @mixes InterceptorMixin
     *
     * @param  {ScrollList} scrollList
     */
    var StopPropagationInterceptor = function(scrollList) {

        //---------------------------------------------------------
        // Private properties
        //---------------------------------------------------------

        /**
         * The scroll list this interceptor applies to.
         * @type {ScrollList}
         */
        this._scrollList = scrollList;
    };

    StopPropagationInterceptor.prototype = {

        //---------------------------------------------------------
        // Public methods
        //---------------------------------------------------------

        /**
         * Cancels interactions on the list map.
         * @param {AwesomeMap} source - The source of the event.
         * @param {InteractionEvent} args.event - The interaction event.
         * @return {undefined|false}
         */
        handleInteraction: function(source, args) {
            var event = args.event;

            // Want to let simulations play out on source map only.
            if (event.simulated) {
                return;
            }

            return false;
        }
    };

    _.assign(StopPropagationInterceptor.prototype, InterceptorMixin);

    return StopPropagationInterceptor;
});
