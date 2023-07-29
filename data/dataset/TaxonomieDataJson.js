Ext.define('Rubedo.store.TaxonomieDataJson', {
    extend: 'Ext.data.Store',
    alias: 'store.TaxonomieDataJson',

    requires: [
        'Rubedo.model.taxonomieDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Taxonomy',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.taxonomieDataModel',
            storeId: 'TaxonomieDataJson',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'taxonomy/create',
                    read: 'taxonomy',
                    update: 'taxonomy/update',
                    destroy: 'taxonomy/delete'
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