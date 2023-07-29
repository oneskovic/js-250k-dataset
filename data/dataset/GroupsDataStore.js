Ext.define('Rubedo.store.GroupsDataStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.GroupsDataStore',

    requires: [
        'Rubedo.model.groupDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            isOptimised: true,
            usedCollection: 'Groups',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.groupDataModel',
            storeId: 'GroupsDataStore',
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'groups/create',
                    read: 'groups/read-child',
                    update: 'groups/update',
                    destroy: 'groups/delete'
                },
                reader: {
                    type: 'json',
                    getResponseData: function(response) {
                        var data, error;

                        try {
                            data = Ext.decode(response.responseText);
                            if (Ext.isDefined(data.data)){data.children=data.data;}// error fix
                            return this.readRecords(data);
                        } catch (ex) {
                            error = new Ext.data.ResultSet({
                                total  : 0,
                                count  : 0,
                                records: [],
                                success: false,
                                message: ex.message
                            });

                            this.fireEvent('exception', this, response, error);

                            Ext.Logger.warn('Unable to parse the JSON returned by the server');

                            return error;
                        }
                    },
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            },
            listeners: {
                write: {
                    fn: me.onTreeStoreWrite,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onTreeStoreWrite: function(store, operation, eOpts) {
        if (Ext.getStore("UsersAdminDataStore").isUsed){
            Ext.getStore("UsersAdminDataStore").load();
        }
    }

});