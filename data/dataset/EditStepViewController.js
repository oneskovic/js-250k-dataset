Ext.define('Ssp.controller.admin.journal.EditStepViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
    	formUtils: 'formRendererUtils',
    	model: 'currentJournalStep',
    	store: 'journalStepsStore',
		adminSelectedIndex: 'adminSelectedIndex'
    },
    config: {
    	containerToLoadInto: 'adminforms',
    	formToDisplay: 'journalstepadmin'
    },
    control: {
    	'saveButton': {
			click: 'onSaveClick'
		},
		
		'cancelButton': {
			click: 'onCancelClick'
		}   	
    },
    
	init: function() {
		this.getView().getForm().loadRecord(this.model);
		return this.callParent(arguments);
    },
    
	onSaveClick: function(button) {
		var me = this;
		if(me.getView().getForm().isValid())
		{
			var record, id, jsonData, url;
			url = this.store.getProxy().url;
			this.getView().getForm().updateRecord();
			record = this.model;
			id = record.get('id');
			jsonData = record.data;
			successFunc = function(response, view) {
				me.adminSelectedIndex.set('value', 1);
				me.displayMain();
			};
			failureFunc = function(response, view) {
				 me.apiProperties.handleError(response);
				 me.getView().setLoading(false);
			};
			
			
			if (id.length > 0)
			{
				// editing
				this.apiProperties.makeRequest({
					url: url+"/"+id,
					method: 'PUT',
					jsonData: jsonData,
					successFunc: successFunc,
					failureFunc: failureFunc
				});
				
			}else{
				// adding
				this.apiProperties.makeRequest({
					url: url,
					method: 'POST',
					jsonData: jsonData,
					successFunc: successFunc,
					failureFunc: failureFunc
				});		
			}
		}else {
			Ext.Msg.alert('SSP Error', 'There are errors highlighted in red'); 
		}
	},
	
	onCancelClick: function(button){
		this.adminSelectedIndex.set('value', -1);
		this.displayMain();
	},
	
	displayMain: function(){
		var comp = this.formUtils.loadDisplay(this.getContainerToLoadInto(), this.getFormToDisplay(), true, {});
	}
});