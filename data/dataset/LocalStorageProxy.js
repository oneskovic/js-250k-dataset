Ext.data.LocalStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    //inherit docs
    getStorageObject: function() {
        return window.localStorage;
    }
});

Ext.data.ProxyMgr.registerType('localstorage', Ext.data.LocalStorageProxy);