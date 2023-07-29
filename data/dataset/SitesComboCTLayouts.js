Ext.define('Rubedo.store.SitesComboCTLayouts', {
    extend: 'Ext.data.Store',
    alias: 'store.SitesComboCTLayouts',

    requires: [
        'Rubedo.model.sitesDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            usedCollection: 'Sites',
            isOptimised: true,
            autoLoad: false,
            model: 'Rubedo.model.sitesDataModel',
            storeId: 'SitesComboCTLayouts',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'sites/create',
                    read: 'sites',
                    update: 'sites/update',
                    destroy: 'sites/delete'
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