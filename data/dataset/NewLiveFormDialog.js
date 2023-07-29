 

dojo.declare("NewLiveFormDialog", wm.Page, {
    i18n: true,
    form: null,
    start: function() {
    },
    setForm: function(inForm) {
	this.form = inForm;
	this.root.clearData();
	this.typeSelect.refreshOptions();
	this.dataSetSelect.refreshOptions();
	this.formBehavior.setDataValue("standard");
	this.readonlyManager.setDataValue(true);
    },
    onCancelClick: function() {
        this.owner.owner.dismiss();
	this.form.destroy();
    },
    dataSetSelectChange: function(inSender, inDataValue, inDisplayValue) {
	var c = studio.page.getValueById(inDataValue);
	if (c && c.type) {
	    this.typeSelect.setDataValue(c.type);
	}
    },
    onOkClick: function(selectedName) {
	this.form.setName(studio.page.getUniqueName(wm.decapitalize(this.typeSelect.getDisplayValue().replace(/^.*\./,"")) + "DBForm"));
	this.form.set_formBehavior(this.formBehavior.getDataValue());
	if (this.typeSelect.getDataValue())
	    this.form.set_type(this.typeSelect.getDataValue());

	this.form.set_readonlyManager(this.readonlyManager.getDataValue());
	if (this.form.formBehavior != "insertOnly" && this.dataSetSelect.getDataValue()) {
	    this.form.$.binding.addWire(null, "dataSet", this.dataSetSelect.getDataValue(), "");
	}
	this.form.eventBindings.onEnterKeyPress = this.form.getId() + ".saveData";
        this.owner.owner.dismiss();
	studio.reinspect(true);
    },

  _end: 0
});
