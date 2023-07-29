Ext.define('Rubedo.store.SiteThemesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.SiteThemesStore',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'CustomThemes',
            autoLoad: false,
            storeId: 'SiteThemesStore',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'fo-themes'
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
                    name: 'label'
                }
            ]
        }, cfg)]);
    }
});