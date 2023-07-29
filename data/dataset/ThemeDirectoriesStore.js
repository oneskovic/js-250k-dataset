Ext.define('Rubedo.store.ThemeDirectoriesStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Rubedo.model.directoryModel',
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
            usedCollection: 'Directories',
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.directoryModel',
            storeId: 'ThemeDirectoriesStore',
            proxy: {
                type: 'ajax',
                batchActions: false,
                api: {
                    create: 'directories/create',
                    read: 'directories/read-child',
                    update: 'directories/update',
                    destroy: 'directories/delete'
                },
                extraParams: {
                    themeMode: true
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
                            console.log(ex);

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
            sorters: {
                property: 'orderValue'
            }
        }, cfg)]);
    }
});