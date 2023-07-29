Ext.define('MyApp.store.GridStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Array',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'MyArrayStore',
            proxy: {
                type: 'ajax',
                url: 'resources/data/grid.json',
                reader: {
                    type: 'array'
                }
            },
            fields: [
                {
                    name: 'company'
                },
                {
                    name: 'change',
                    type: 'float'
                },
                {
                    name: 'pctChange',
                    type: 'float'
                }
            ]
        }, cfg)]);
    }
});