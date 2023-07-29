 
dojo.provide("wm.studio.pages.CreateLiveView.CreateLiveView");

dojo.declare("CreateLiveView", wm.Page, {
        i18n: true,
	start: function() {
		this.update();
	},
	update: function() {
		this.updateServicesSelect()
		this.updateDataTypeList();
		this.okButton.setDisabled(true);
	},
	updateServicesSelect: function() {
		var options=[];
		this.serviceSelectEditor.clear();
		for (var i in wm.dataSources.sources)
			options.push(i);
		this.serviceSelectEditor.editor.setOptions(options.join());
		if (options.length)
			this.serviceSelectEditor.setDisplayValue(options[0]);
	},
	updateDataTypeList: function() {
		var
			d = this.serviceSelectEditor.getDataValue(),
			types = wm.dataSources.sources[d] ||[];
		this.dataTypeList.renderData(types);
		this.okButton.setDisabled(true);
	},
	dataTypeListSelect: function() {
		this.okButton.setDisabled(false);
	},
	dataTypeListFormat: function(inSender, ioData) {
		var i = '<img src="images/wm/data.png" height="16" width="16" align="absmiddle"> ', d = ioData.data;
		ioData.data = d ? i + d : d;
	},
    onListDblClick: function(inSender) {
	wm.fire(this.owner, "dismiss", ["OK"]);
    },
	okButtonClick: function(inSender, inEvent) {
		wm.fire(this.owner, "dismiss", [inEvent]);
	},
	cancelButtonClick: function(inSender, inEvent) {
		wm.fire(this.owner, "dismiss", [inEvent]);
	},
	_end: 0
});
