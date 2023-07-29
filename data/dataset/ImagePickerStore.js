Ext.define('Rubedo.store.ImagePickerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ImagePickerStore',

    requires: [
        'Rubedo.model.imageDataModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'Rubedo.model.imageDataModel',
            storeId: 'ImagePickerStore',
            pageSize: 1000,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'image/create',
                    read: 'image',
                    update: 'image/update',
                    destroy: 'image/delete'
                },
                reader: {
                    type: 'json',
                    messageProperty: 'message',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});