/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";
    
    var NodeConnection = brackets.getModule("utils/NodeConnection");
    
    /**
     * @private
     * @type{NodeConnection}
     * Connection to node for executing commands like enableDebugger
     */
    var _nodeConnection = null;

    /**
     * @private
     * @type{Array.<{level: string, timestamp: Date, message: string}>}
     * History of all log messages received from node (useful for inspecting
     * from the developer tools console)
     */
    var _nodeLog = [];

    /**
     * Logs the state of the current node server to the console.
     */
    function logNodeState() {
        if (brackets.app && brackets.app.getNodeState) {
            brackets.app.getNodeState(function (err, port) {
                if (err) {
                    console.log("[NodeDebugUtils] Node is in error state " + err);
                } else {
                    console.log("[NodeDebugUtils] Node is listening on port " + port);
                }
            });
        } else {
            console.error("[NodeDebugUtils] No brackets.app.getNodeState function. Maybe you're running the wrong shell?");
        }
    }
    
    /**
     * Sends a command to node to cause a restart.
     */
    function restartNode() {
        try {
            _nodeConnection.domains.base.restartNode();
        } catch (e) {
            alert("Failed trying to restart Node: " + e.message);
        }
    }

    /**
     * Sends a command to node to enable the debugger.
     */
    function enableDebugger() {
        try {
            _nodeConnection.domains.base.enableDebugger();
        } catch (e) {
            alert("Failed trying to enable Node debugger: " + e.message);
        }
    }
    
    /**
     * @private
     * Handler for log events from Node. Stores the messages in an internal array
     * for possible inspection in the developer tools. Also forwards messages to
     * the developer tools console.
     * @param {jQuery.Event} evt The event object from jQuery (not used)
     * @param {string} level The level of the log message. Can be anything, but
     *   should be something like "log", "info", "warn", or "error"
     * @param {string} timestamp Time the event occurred in node, as a string
     * @param {string} message The log message
     */
    function handleLogEvent(evt, level, timestamp, message) {
        // For some reason, stringifying and then parsing a Date through JSON turns
        // it into a string.
        var timestampAsDate = new Date(timestamp);
        
        _nodeLog.push({
            level: level,
            timestamp: timestampAsDate,
            message: message
        });
    
        var formattedMessage = "[node-" + level + " " + timestampAsDate.toLocaleTimeString() +  "] " + message;
        
        switch (level) {
        case "info":
        case "warn":
        case "error":
            console[level](formattedMessage);
            break;
        default:
            console.log(formattedMessage);
        }
        
    }
    
    _nodeConnection = new NodeConnection();
    _nodeConnection.connect(true);
    
    // TODO: It would be nice to add a menu item that allows the user
    // to enable/disable forwarding of node logs to the console.
    _nodeConnection.on("base:log", handleLogEvent);
    
    exports.logNodeState = logNodeState;
    exports.restartNode = restartNode;
    exports.enableDebugger = enableDebugger;
    
});
