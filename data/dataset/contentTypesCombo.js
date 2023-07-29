Ext.define('Rubedo.store.contentTypesCombo', {
    extend: 'Ext.data.Store',
    alias: 'store.contentTypesCombo',

    requires: [
        'Rubedo.model.typesContenusDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'ContentTypes',
            autoLoad: false,
            model: 'Rubedo.model.typesContenusDataModel',
            storeId: 'contentTypesCombo',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'content-types/create',
                    read: 'content-types',
                    update: 'content-types/update',
                    destroy: 'content-types/delete'
                },
                extraParams: {
                    tFilter: '[{"property":"dependant","value":false},{"property":"system","value":{"$ne":true}}]'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    nameProperty: 'mapping',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});