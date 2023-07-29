Ext.define('Rubedo.store.DAMStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DAMStore',

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
            autoSync: true,
            model: 'Rubedo.model.DAMModel',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'DAMStore',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'dam/create',
                    read: 'dam',
                    update: 'dam/update',
                    destroy: 'dam/delete'
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