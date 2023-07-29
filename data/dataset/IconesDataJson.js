Ext.define('Rubedo.store.IconesDataJson', {
    extend: 'Ext.data.Store',
    alias: 'store.IconesDataJson',

    requires: [
        'Rubedo.model.iconDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            silentOps: true,
            autoLoad: true,
            autoSync: true,
            model: 'Rubedo.model.iconDataModel',
            storeId: 'IconesDataJson',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'icons/create',
                    read: 'icons',
                    update: 'icons/update',
                    destroy: 'icons/delete'
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