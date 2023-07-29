Ext.define('Rubedo.store.DAMPickerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DAMPickerStore',

    requires: [
        'Rubedo.model.DAMModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'DAM',
            autoLoad: false,
            model: 'Rubedo.model.DAMModel',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'DAMPickerStore',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    read: 'dam'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});