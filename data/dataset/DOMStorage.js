/**
 * @constructor
 */
WebInspector.DOMStorage = function(id, domain, isLocalStorage)
{
    this._id = id;
    this._domain = domain;
    this._isLocalStorage = isLocalStorage;
}

WebInspector.DOMStorage.prototype = {
    /** @return {string} */
    get id()
    {
        return this._id;
    },

    /** @return {string} */
    get domain()
    {
        return this._domain;
    },

    /** @return {boolean} */
    get isLocalStorage()
    {
        return this._isLocalStorage;
    },

    /**
     * @param {function(?Protocol.Error, Array.<DOMStorageAgent.Entry>):void=} callback
     */
    getEntries: function(callback)
    {
        DOMStorageAgent.getDOMStorageEntries(this._id, callback);
    },

    /**
     * @param {string} key
     * @param {string} value
     * @param {function(?Protocol.Error, boolean):void=} callback
     */
    setItem: function(key, value, callback)
    {
        DOMStorageAgent.setDOMStorageItem(this._id, key, value, callback);
    },

    /**
     * @param {string} key
     * @param {function(?Protocol.Error, boolean):void=} callback
     */
    removeItem: function(key, callback)
    {
        DOMStorageAgent.removeDOMStorageItem(this._id, key, callback);
    }
}

/**
 * @constructor
 * @implements {DOMStorageAgent.Dispatcher}
 */
WebInspector.DOMStorageDispatcher = function()
{
}

WebInspector.DOMStorageDispatcher.prototype = {

    /**
     * @param {DOMStorageAgent.Entry} payload
     */
    addDOMStorage: function(payload)
    {
        var domStorage = new WebInspector.DOMStorage(
            payload.id,
            payload.host,
            payload.isLocalStorage);
        WebInspector.panels.resources.addDOMStorage(domStorage);
    },

    /**
     * @param {string} storageId
     */
    domStorageUpdated: function(storageId)
    {
        WebInspector.panels.resources.domStorageUpdated(storageId);
    }
}
