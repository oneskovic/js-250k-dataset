Ext.define('Rubedo.store.DAMFolderViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DAMFolderViewStore',

    requires: [
        'Rubedo.model.DAMFolderViewModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'DAM',
            DAMTypeFilters: [
                
            ],
            directoryFilter: 'notFiled',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.DAMFolderViewModel',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'DAMFolderViewStore',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'dam/create',
                    read: 'dam',
                    update: 'dam/update',
                    destroy: 'dam/delete'
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
                beforeload: {
                    fn: me.onJsonstoreBeforeLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreBeforeLoad: function(store, operation, eOpts) {
        if (!Ext.isEmpty(store.DAMTypeFilters)){
            store.getProxy().extraParams.filter="[{\"property\":\"typeId\",\"operator\":\"$in\",\"value\":"+Ext.JSON.encode(store.DAMTypeFilters)+"},{\"property\":\"directory\",\"value\":\""+store.directoryFilter+"\"}]";
        } else {
            store.getProxy().extraParams.filter="[{\"property\":\"directory\",\"value\":\""+store.directoryFilter+"\"}]";
        }
        try{
            Ext.Array.forEach(operation.sorters, function(sorter){
                if (sorter.property=="text"){
                    sorter.property="title";
                }
            });
        } catch(err){console.log("failed to fix sort");}
    }

});