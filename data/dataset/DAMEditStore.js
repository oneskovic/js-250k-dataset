Ext.define('Rubedo.store.DAMEditStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DAMEditStore',

    requires: [
        'Rubedo.model.DAMModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
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
            remoteSort: true,
            storeId: 'DAMEditStore',
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
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});