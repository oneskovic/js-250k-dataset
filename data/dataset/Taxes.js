Ext.define('Rubedo.store.Taxes', {
    extend: 'Ext.data.Store',
    alias: 'store.Taxes',

    requires: [
        'Rubedo.model.tax',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Taxes',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.tax',
            storeId: 'Taxes',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'taxes/create',
                    read: 'taxes',
                    update: 'taxes/update',
                    destroy: 'taxes/delete'
                },
                extraParams: {
                    notAll: true
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