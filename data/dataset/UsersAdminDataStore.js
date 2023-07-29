Ext.define('Rubedo.store.UsersAdminDataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UsersAdminDataStore',

    requires: [
        'Rubedo.model.userDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Users',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.userDataModel',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'UsersAdminDataStore',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'users/create',
                    read: 'users',
                    update: 'users/update',
                    destroy: 'users/delete'
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
            },
            sorters: {
                property: 'name'
            }
        }, cfg)]);
    }
});