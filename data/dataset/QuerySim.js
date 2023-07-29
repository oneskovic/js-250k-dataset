Ext.define('Rubedo.store.QuerySim', {
    extend: 'Ext.data.Store',
    alias: 'store.QuerySim',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'QuerySim',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'queries/simulate-result'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'id'
                }
            ]
        }, cfg)]);
    }
});