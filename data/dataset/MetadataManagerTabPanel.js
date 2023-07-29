Ext.define('LIME.ux.metadataManager.MetadataManagerTabPanel', {

    extend : 'Ext.panel.Panel',

    alias : 'widget.metaManagerPanel',
    
    config : {
        pluginName : "metadataManager"
    },
    
    autoScroll: true,
    
    initComponent: function() {
    	this.title = this.title || Locale.getString("title", this.getPluginName());
    	this.callParent(arguments);
    }
});
