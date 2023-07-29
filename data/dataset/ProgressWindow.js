/**
 * This view is used by other components that need to show a progress bar.
 */

Ext.define('LIME.view.ProgressWindow', {
	extend : 'Ext.Window',
	alias : 'widget.progressWindow',
	
	width: 350,
	closable: false,
    resizable : false,
    collapsible: false,
    draggable : false,
    modal: true,
	
	items : [{
	    xtype: "progressbar"
	}],
	
	initComponent: function(){
        this.title = Locale.strings.progressBar.title;
        this.callParent(arguments);
    }

}); 
