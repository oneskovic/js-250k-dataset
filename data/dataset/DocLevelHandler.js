/*jslint sub: true */

/**
 * Constructor for a doc level handler.
 *
 * @param {String}
 *            eventName the name of the event (must be valid dom event)
 * @param {Function}
 *            callback the callback function for the event (will be wrapped)
 * @param {Component}
 *            component the component attached to the handler.
 *
 * @constructor
 * @private
 */
$A.ns.DocLevelHandler = function DocLevelHandler(eventName, callback, component) {
    this.eventName = eventName;
    this.component = component;
    this.enabled = false;
    var that = this;
    this.callback = function(eventObj) {
        if (that.component.isRenderedAndValid()) {
            callback(eventObj);
        }
    };
};

/**
 * Set whether the handler is enabled.
 *
 * This function will enable or disable the handler as necessary. Note that the
 * callback will be called only if the component is rendered.
 *
 * @param {Boolean}
 *            enable if truthy, the handler is enabled, otherwise disabled.
 */
$A.ns.DocLevelHandler.prototype.setEnabled = function(enable) {
    if (enable) {
        if (!this.enabled) {
            this.enabled = true;
            $A.util.on(document.body, this.eventName, this.callback);
        }
    } else {
        if (this.enabled) {
            this.enabled = false;
            $A.util.removeOn(document.body, this.eventName, this.callback);
        }
    }
};

var dlp = $A.ns.DocLevelHandler.prototype;
exp(dlp, "setEnabled", dlp.setEnabled);