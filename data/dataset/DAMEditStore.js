/*
 * File: app/store/DAMEditStore.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Rubedo.store.DAMEditStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DAMEditStore',

    requires: [
        'Rubedo.model.DAMModel',
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
            autoLoad: false,
            autoSync: true,
            model: 'Rubedo.model.DAMModel',
            remoteSort: true,
            storeId: 'DAMEditStore',
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
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});