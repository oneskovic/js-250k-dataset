Ext.define('Ssp.controller.admin.config.CourseWorkHoursAdminViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	store: 'configurationOptionsUnpagedStore',
		formUtils: 'formRendererUtils',
		apiProperties: 'apiProperties'
    },
	
    control: {
    	'addButton': {
			click: 'onAddClick'
		},
		cwNameField: '#cwName',
    	cwDescriptionField: '#cwDescription',
    	cwRangeStartField: '#cwRangeStart',
    	cwRangeEndField: '#cwRangeEnd',
    	cwLabelField: '#cwLabel',
		
		courseworkhourslistadmin: '#courseworkhourslistadmin',
		courseworkhoursaddadmin: '#courseworkhoursaddadmin'
    }, 
	 
	init: function() {
		var me=this;
		
		
		
		me.store.clearFilter();
		
		me.store.filter([{filterFn: function(item) { return item.get("name") == 'weekly_course_work_hour_ranges'; }}]);
		
		me.formUtils.reconfigureGridPanel( me.getCourseworkhourslistadmin(), me.store);
		me.store.load({
            extraParams: {
                limit: "-1"
            } 
        });
		
		
		
		return me.callParent(arguments);
    }, 
    
	onAddClick: function(button) {
		var me=this;
		var formsToValidate = [me.getCourseworkhoursaddadmin().getForm()];
        var validateResult = me.formUtils.validateForms(formsToValidate);
        if (validateResult.valid) {
		//var jsonConfigData = Ext.encode(Ext.pluck(me.store.data.items,'data'));
		var configData = Ext.pluck(me.store.data.items,'data')[0];
		var valuesString = configData.value;
		var vsLength = (valuesString.length-1);
		var subVS = valuesString.substr(0,vsLength);
		
		if(valuesString.length)
		{
			var addString = "," + "\n\t\t{" + '"name":' + '"' + me.getCwNameField().getValue() + '",' +
							 '"description":' + '"'  + me.getCwDescriptionField().getValue() + '",' +
							 '"rangeStart":' + me.getCwRangeStartField().getValue() + ',' +
							 '"rangeEnd":' + me.getCwRangeEndField().getValue() + ',' +
							 '"rangeLabel":' + '"' + me.getCwLabelField().getValue() + '"' + "}" +
							 "]";
				
		}
							
		else{
			var addString = "[" + "{" + '"name":' + '"' + me.getCwNameField().getValue() + '",' +
							 '"description":' + '"'  + me.getCwDescriptionField().getValue() + '",' +
							 '"rangeStart":' + me.getCwRangeStartField().getValue() + ',' +
							 '"rangeEnd":' + me.getCwRangeEndField().getValue() + ',' +
							 '"rangeLabel":' + '"' + me.getCwLabelField().getValue() + '"' + "}" +
							 "]";
					
		}
		var newValueString = subVS + addString;
		configData.value = newValueString;
		var rec = me.store.first();
		Ext.Ajax.request({
				url: me.store.getProxy().url+"/"+configData.id,
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				jsonData: configData,
				success: function(response, view) {
						var r = Ext.decode(response.responseText);
						rec.commit();
						me.getCourseworkhourslistadmin().getStore().sync();
						rec.persisted = true;
						
				me.getCourseworkhoursaddadmin().getForm().reset();
					
				},
				failure: this.apiProperties.handleError
			}, this);
		}
        else {
            me.formUtils.displayErrors(validateResult.fields);
        }
      
	}

});