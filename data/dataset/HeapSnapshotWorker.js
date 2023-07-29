WebInspector = {};
WebInspector.UIString = function(s) { return s; };

importScripts("HeapSnapshot.js");
importScripts("HeapSnapshotLoader.js");
importScripts("HeapSnapshotWorkerDispatcher.js");
importScripts("JSHeapSnapshot.js");
importScripts("NativeHeapSnapshot.js");
importScripts("FileUtils.js");
importScripts("utilities.js");

function postMessageWrapper(message)
{
    postMessage(message);
}

/**
 * @constructor
 */
WebInspector.WorkerConsole = function()
{
}

WebInspector.WorkerConsole.prototype = {
    /** @param {...*} var_args */
    log: function(var_args)
    {
        this._postMessage("log", Array.prototype.slice.call(arguments));
    },

    /** @param {...*} var_args */
    error: function(var_args)
    {
        this._postMessage("error", Array.prototype.slice.call(arguments));
    },

    /** @param {...*} var_args */
    info: function(var_args)
    {
        this._postMessage("info", Array.prototype.slice.call(arguments));
    },

    trace: function()
    {
        this.log(new Error().stack);
    },

    /** @param {string} method */
    /** @param {Array.<*>} args */
    _postMessage: function(method, args)
    {
        var rawMessage = {
            object: "console",
            method: method,
            arguments: args
        };
        postMessageWrapper(rawMessage);
    }
};

var dispatcher = new WebInspector.HeapSnapshotWorkerDispatcher(this, postMessageWrapper);
addEventListener("message", dispatcher.dispatchMessage.bind(dispatcher), false);
console = new WebInspector.WorkerConsole();
