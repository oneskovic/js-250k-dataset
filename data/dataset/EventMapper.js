define(function(require, exports, module) {
    var EventHandler = require('../core/EventHandler');

    /**
     * EventMapper routes events to various event destinations
     *  based on custom logic.  The function signature is arbitrary.
     *
     * @class EventMapper
     * @constructor
     *
     * @param {function} mappingFunction function to determine where
     *  events are routed to.
     */
    function EventMapper(mappingFunction) {
        EventHandler.call(this);
        this._mappingFunction = mappingFunction;
    }
    EventMapper.prototype = Object.create(EventHandler.prototype);
    EventMapper.prototype.constructor = EventMapper;

    EventMapper.prototype.subscribe = null;
    EventMapper.prototype.unsubscribe = null;

    /**
     * Trigger an event, sending to all mapped downstream handlers
     *   listening for provided 'type' key.
     *
     * @method emit
     *
     * @param {string} type event type key (for example, 'click')
     * @param {Object} data event data
     * @return {EventHandler} this
     */
    EventMapper.prototype.emit = function emit(type, data) {
        var target = this._mappingFunction.apply(this, arguments);
        if (target && (target.emit instanceof Function)) target.emit(type, data);
    };

    /**
     * Alias of emit.
     * @method trigger
     */
    EventMapper.prototype.trigger = EventMapper.prototype.emit;

    module.exports = EventMapper;
});
