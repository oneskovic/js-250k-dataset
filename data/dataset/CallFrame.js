WebInspector.CallFrame = function(id, sourceCodeLocation, functionName, thisObject, scopeChain, nativeCode)
{
    WebInspector.Object.call(this);

    console.assert(!sourceCodeLocation || sourceCodeLocation instanceof WebInspector.SourceCodeLocation);
    console.assert(!thisObject || thisObject instanceof WebInspector.RemoteObject);
    console.assert(!scopeChain || scopeChain instanceof Array);

    this._id = id || null;
    this._sourceCodeLocation = sourceCodeLocation || null;
    this._functionName = functionName || null;
    this._thisObject = thisObject || null;
    this._scopeChain = scopeChain || [];
    this._nativeCode = nativeCode || false;
};

WebInspector.CallFrame.prototype = {
    constructor: WebInspector.CallFrame,

    // Public

    get id()
    {
        return this._id;
    },

    get sourceCodeLocation()
    {
        return this._sourceCodeLocation;
    },

    get functionName()
    {
        return this._functionName;
    },

    get nativeCode()
    {
        return this._nativeCode;
    },

    get thisObject()
    {
        return this._thisObject;
    },

    get scopeChain()
    {
        return this._scopeChain;
    },

    saveIdentityToCookie: function()
    {
        // Do nothing. The call frame is torn down when the inspector closes, and
        // we shouldn't restore call frame content views across debugger pauses.
    },

    collectScopeChainVariableNames: function(callback)
    {
        var result = {this: true};

        var pendingRequests = this._scopeChain.length;

        function propertiesCollected(properties)
        {
            for (var i = 0; properties && i < properties.length; ++i)
                result[properties[i].name] = true;

            if (--pendingRequests)
                return;

            callback(result);
        }

        for (var i = 0; i < this._scopeChain.length; ++i)
            this._scopeChain[i].object.getAllProperties(propertiesCollected);
    }
};

WebInspector.CallFrame.prototype.__proto__ = WebInspector.Object.prototype;
