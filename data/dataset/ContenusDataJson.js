Ext.define('Rubedo.store.ContenusDataJson', {
    extend: 'Ext.data.Store',
    alias: 'store.ContenusDataJson',

    requires: [
        'Rubedo.model.contenusDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'contents',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.contenusDataModel',
            remoteFilter: true,
            remoteSort: true,
            storeId: ' ',
            pageSize: 50,
            sortOnFilter: false,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'contents/create',
                    read: 'contents',
                    update: 'contents/update',
                    destroy: 'contents/delete'
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
            },
            listeners: {
                update: {
                    fn: me.onJsonstoreUpdate,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreUpdate: function(store, record, operation, modifiedFieldNames, eOpts) {
        Rubedo.controller.ContributionContenusController.prototype.contentsSelect(Ext.getCmp("ContenusGrid"), Ext.getCmp("ContenusGrid").getSelectionModel().getSelection());

    }

});