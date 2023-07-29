/**
 * This a panel containing ListViews
 */
Ext.define('LIME.view.modal.newOpenfile.ListFilesPanel', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.listFilesPanel',
    requires : ['LIME.view.modal.newOpenfile.ListView'],
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    autoScroll : true,
    border : false,
    margin : 2,
    items : [{
        xtype : 'openFileListView',
        path : 'root'
    }, {
        xtype : 'openFileListView'
    }, {
        xtype : 'openFileListView'
    }]
});
