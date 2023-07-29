/**
 * Pdf viewer tab, this tab uses two plugins one for converting content
 * to pdf and the other to show the pdf in the tab
 */
Ext.define('LIME.ux.pdfPreview.PdfPreviewMainTab', {
    extend : 'Ext.panel.Panel',

    requires : ['Ext.ux.Iframe'],

    config : {
        pluginName : "pdfPreview"
    },

    // set the alias
    alias : 'widget.pdfPreviewMainTab',

    cls : 'editorTab',

    // set the layout type
    layout : 'fit',

    notEditMode : true,

    width : '100%',
    padding : 0,
    margin : 0,
    border : 0,

    /**
     * This function set the pdf by calling the pdf viewer plugin
     * this is the only interaction with "pdfplugin" plugin
     * @param {String} url The url of pdf to view
     */
    setPdf : function(url) {
        var plugin = this.getPlugin('pdfplugin');
        plugin.setSrc(url);
    },
    
    getIframePlugin : function() {
        return this.getPlugin('pdfplugin');
    },

    initComponent : function() {
        this.plugins = [{
            ptype : 'iframe',
            pluginId : 'pdfplugin'
        }];
        this.title = Locale.getString("tabTitle", this.getPluginName());
        this.callParent(arguments);
    }
});
