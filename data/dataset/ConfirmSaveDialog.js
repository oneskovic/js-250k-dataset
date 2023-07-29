 

dojo.declare("ConfirmSaveDialog", wm.Page, {
    i18n: true,
    start: function() {
	this.defaultMessage = this.html.html;
    },
    /* Use skipConfirm as a place to indicate if the user doesn't actually need to save and can just continue without saving
     * and without prompting them 
     */
    setup: function(inHtml, onSave, onDontSave, onCancel, skipConfirm) {	
	if (skipConfirm) {
	    onDontSave();
	} else {
	    this.html.setHtml(inHtml || this.defaultMessage);
	    this._onSave = onSave;
	    this._onDontSave = onDontSave;
	    this._onCancel = onCancel;
	    this.owner.owner.show();
	    this.html.doAutoSize(true,true);
	    this.owner.owner.setHeight((this.html.bounds.h + this.buttonBar.bounds.h + this.mainPanel.padBorderMargin.t + this.mainPanel.padBorderMargin.b + this.owner.owner.padBorderMargin.t + this.owner.owner.padBorderMargin.b) + "px");
	}
    },
    saveClick: function() {
	this.owner.owner.hide();
	if (this._onSave)
	    this._onSave();
    },
    cancelClick: function() {
	this.owner.owner.hide();
	if (this._onCancel)
	    this._onCancel();
    },
    dontSaveClick: function() {
	this.owner.owner.hide();
	if (this._onDontSave)
	    this._onDontSave();
    },
  onEscapeKey: function() {
      this.cancelClick();
  },
  
    _end: 0
});