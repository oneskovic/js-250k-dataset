Ext.define('Rubedo.store.NestedContentsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.NestedContentsStore',

    requires: [
        'Rubedo.model.nestedContentModel',
        'Ext.util.Grouper',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.nestedContentModel',
            storeId: 'NestedContentsStore',
            pageSize: 50,
            listeners: {
                update: {
                    fn: me.onStoreUpdate,
                    scope: me
                }
            },
            groupers: {
                property: 'typeId'
            },
            proxy: {
                type: 'ajax',
                api: {
                    create: 'nested-contents/create',
                    read: 'nested-contents',
                    update: 'nested-contents/update',
                    destroy: 'nested-contents/delete'
                },
                extraParams: {
                    parentId: 'default'
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
    },

    onStoreUpdate: function(store, record, operation, modifiedFieldNames, eOpts) {
        Rubedo.controller.ContributionContenusController.prototype.nestedContentsSelect(Ext.getCmp("NestedContentsGrid"), Ext.getCmp("NestedContentsGrid").getSelectionModel().getSelection());

    }

});