/**
 * Class: oscar.Gui.AlertDialog
 * 
 * A GUI dialog widget that displays an alert. 
 * 
 * Inherits from:
 * - <oscar.Gui.Dialog>
 */

oscar.Gui.AlertDialog = oscar.BaseClass(oscar.Gui.Dialog, {
	/**
	 * Constructor: oscar.Gui.AlertDialog
	 * 
	 * Parameters: 
	 * 
	 * header - header for this alert dialog.  
	 * content - alert content. 
	 * options - {Object} An optional object whose properties will be set on
	 * 			 this instance.
	 * 
	 * @deprecated
	 */

	initialize : function(header, content, options) {
		if (!header) header = oscar.i18n("alertBoxHeader");
		if (!content) content = oscar.i18n("oneChecked");
		if (!options) options = [];
		options.icon = YAHOO.widget.SimpleDialog.ICON_WARN;
		oscar.Gui.Dialog.prototype.initialize.apply(this,["AlertDialog",options]);
		this.addOkButton();
		this.setHeader(header);
		this.setContent(content);
		this.show();
	},
	
	/**
	 * Constant: CLASS_NAME
	 * - oscar.Gui.AlertDialog
	 */
	CLASS_NAME :"oscar.Gui.AlertDialog"
});
