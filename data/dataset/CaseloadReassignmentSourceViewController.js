Ext.define('Ssp.controller.admin.caseload.CaseloadReassignmentSourceViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
    	caseloadService: 'caseloadService',
        // Don't use caseloadStore b/c that's also used by the search UI. So
        // all the reloading we do in this component breaks the search view if
        // it's currently on-screen. See SSP-2003.
    	store: 'reassignCaseloadStagingStore',
    	formUtils: 'formRendererUtils',
        coachesStore: 'allCoachesCurrentStore',
        reassignCaseloadStore: 'reassignCaseloadStore',
    	appEventsController: 'appEventsController'
        
    },
    config: {
    	containerToLoadInto: 'adminforms',
    	formToDisplay: 'editreferral'
    },
    control: {
		'addAllButton': {
			click: 'onAddAllButtonClick'
		},
		'addButton': {
			click: 'onAddClick'
		},		
		'sourceCoachBox': {
				change: 'onCoachChange'
    		}
    },       
	init: function() {
		var me=this;
		me.coachesStore.load();
		me.store.removeAll();
	     me.formUtils.reconfigureGridPanel( me.getView(), me.store);
		return me.callParent(arguments);
    },
     onCoachChange: function(combobox, newValue,oldValue,eOpts) {
    	var me=this;
    	me.getView().setLoading(true);
    	var success = function(){
    		me.getView().setLoading(false);
    	}
    	var failure = function(){
	     	Ext.Msg.alert('SSP Error', 'There was an issue in loading assigned students for this coach.'); 
    	}
    	me.coachId = newValue;
    	me.caseloadService.getCaseloadById(me.coachId, me.store, {success: success, failure: failure, scope: me});
		me.formUtils.reconfigureGridPanel( me.getView(), me.store);
	},   
	onAddAllButtonClick: function(button) {
		var me=this;
		if(me.store.getCount()>0)
		{
			me.reassignCaseloadStore.add(me.store.data.items);
			me.store.removeAll(false);
			me.appEventsController.getApplication().fireEvent('studentAdded');
		}
	},
	onAddClick: function(button){
		me=this;
		if(me.getView().getSelectionModel().getSelection().length > 0)
		{
			for(var i=0; i<me.getView().getSelectionModel().getSelection().length; i++)
			{
				me.reassignCaseloadStore.add(me.getView().getSelectionModel().getSelection()[i]);
			}
			me.store.remove(me.getView().getSelectionModel().getSelection());
			me.appEventsController.getApplication().fireEvent('studentAdded');
		}
		else
		{
	     	   Ext.Msg.alert('SSP Error', 'Please select a student or students to add.'); 
		}
	}
});