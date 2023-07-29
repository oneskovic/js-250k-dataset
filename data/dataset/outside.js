// Outside events are pre-defined for each of these native DOM events
var nativeEvents = [
        'blur', 'change', 'click', 'dblclick', 'focus', 'keydown', 'keypress',
        'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
        'select', 'submit'
    ];

/**
 * Defines a new outside event to correspond with the given DOM event.
 *
 * By default, the created synthetic event name will be the name of the event
 * with "outside" appended (e.g. "click" becomes "clickoutside"). If you want
 * a different name for the created Event, pass it as a second argument like so:
 * <code>Y.Event.defineOutside(eventType, "yonderclick")</code>.
 *
 * @method defineOutside
 * @param {String} event DOM event
 * @param {String} name (optional) custom outside event name
 * @static
 * @for Event
 */
Y.Event.defineOutside = function (event, name) {
    name = name || (event + 'outside');

    var config = {

        on: function (node, sub, notifier) {
            sub.handle = Y.one('doc').on(event, function(e) {
                if (this.isOutside(node, e.target)) {
                    e.currentTarget = node;
                    notifier.fire(e);
                }
            }, this);
        },

        detach: function (node, sub, notifier) {
            sub.handle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            sub.handle = Y.one('doc').delegate(event, function (e) {
                if (this.isOutside(node, e.target)) {
                    notifier.fire(e);
                }
            }, filter, this);
        },

        isOutside: function (node, target) {
            return target !== node && !target.ancestor(function (p) {
                    return p === node;
                });
        }
    };
    config.detachDelegate = config.detach;

    Y.Event.define(name, config);
};

// Define outside events for some common native DOM events
Y.Array.each(nativeEvents, function (event) {
    Y.Event.defineOutside(event);
});
