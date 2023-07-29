/**
 * @constructor
 */
WebInspector.HeapSnapshotWorkerDispatcher = function(globalObject, postMessage)
{
    this._objects = [];
    this._global = globalObject;
    this._postMessage = postMessage;
}

WebInspector.HeapSnapshotWorkerDispatcher.prototype = {
    _findFunction: function(name)
    {
        var path = name.split(".");
        var result = this._global;
        for (var i = 0; i < path.length; ++i)
            result = result[path[i]];
        return result;
    },

    /**
     * @param {string} name
     * @param {*} data
     */
    sendEvent: function(name, data)
    {
        this._postMessage({eventName: name, data: data});
    },

    dispatchMessage: function(event)
    {
        var data = /** @type {!WebInspector.HeapSnapshotCommon.WorkerCommand } */(event.data);
        var response = {callId: data.callId};
        try {
            switch (data.disposition) {
                case "create": {
                    var constructorFunction = this._findFunction(data.methodName);
                    this._objects[data.objectId] = new constructorFunction(this);
                    break;
                }
                case "dispose": {
                    delete this._objects[data.objectId];
                    break;
                }
                case "getter": {
                    var object = this._objects[data.objectId];
                    var result = object[data.methodName];
                    response.result = result;
                    break;
                }
                case "factory": {
                    var object = this._objects[data.objectId];
                    var result = object[data.methodName].apply(object, data.methodArguments);
                    if (result)
                        this._objects[data.newObjectId] = result;
                    response.result = !!result;
                    break;
                }
                case "method": {
                    var object = this._objects[data.objectId];
                    response.result = object[data.methodName].apply(object, data.methodArguments);
                    break;
                }
                case "evaluateForTest": {
                    try {
                        response.result = eval(data.source)
                    } catch (e) {
                        response.result = e.toString();
                    }
                    break;
                }
            }
        } catch (e) {
            response.error = e.toString();
            response.errorCallStack = e.stack;
            if (data.methodName)
                response.errorMethodName = data.methodName;
        }
        this._postMessage(response);
    }
};
