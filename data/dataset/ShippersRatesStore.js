Ext.define('Rubedo.store.ShippersRatesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ShippersRatesStore',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ShippersRatesStore',
            fields: [
                {
                    name: 'country'
                },
                {
                    name: 'rate'
                },
                {
                    name: 'delay'
                },
                {
                    name: 'hRDelay'
                },
                {
                    name: 'hRUnit'
                },
                {
                    name: 'tax'
                }
            ]
        }, cfg)]);
    }
});