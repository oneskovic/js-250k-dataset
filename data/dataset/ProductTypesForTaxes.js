Ext.define('Rubedo.store.ProductTypesForTaxes', {
    extend: 'Ext.data.Store',
    alias: 'store.ProductTypesForTaxes',

    requires: [
        'Rubedo.model.typesContenusDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'ContentTypes',
            autoLoad: false,
            model: 'Rubedo.model.typesContenusDataModel',
            storeId: 'ProductTypesForTaxes',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'content-types'
                },
                extraParams: {
                    tFilter: '[{"property":"dependant","value":false},{"property":"productType","value":"configurable"},{"property":"system","value":{"$ne":true}}]'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            listeners: {
                load: {
                    fn: me.onJsonstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreLoad: function(store, records, successful, eOpts) {
        store.add({type:"*",id:"*"});
    }

});