Ext.define('Rubedo.store.DepTypesForContents', {
    extend: 'Ext.data.Store',
    alias: 'store.DepTypesForContents',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Filter',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'ContentTypes',
            autoLoad: false,
            storeId: 'DepTypesForContents',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'content-types/create',
                    read: 'content-types',
                    update: 'content-types/update',
                    destroy: 'content-types/delete'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            filters: {
                property: 'dependant',
                value: true
            },
            fields: [
                {
                    name: 'type'
                },
                {
                    name: 'dependant',
                    type: 'boolean'
                },
                {
                    name: 'id'
                }
            ]
        }, cfg)]);
    }
});