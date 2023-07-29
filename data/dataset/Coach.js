Ext.define('Ssp.view.person.Coach', {
	extend: 'Ext.form.Panel',
	alias: 'widget.personcoach',
    mixins: [ 'Deft.mixin.Injectable',
              'Deft.mixin.Controllable'],
    controller: 'Ssp.controller.person.CoachViewController',
    inject: {
    	coachesStore: 'coachesStore',
        configStore: 'configStore'
    },
	width: '100%',
	padding: '0 0 0 0',
	layout: {
		type:'vbox'
	},
	initComponent: function() {	
		var me=this;
		Ext.apply(me, 
				{
			    border: 0,
			    fieldDefaults: {
			        msgTarget: 'side',
			        labelAlign: 'top',
			        labelWidth: 100
			    },	
				items: [{
			            xtype: 'fieldset',
			            border: 0,
			            padding: 0,
			            title: '',
			            defaultType: 'textfield',
			            defaults: {
			                //anchor: '100%'
			            },
			       items: [{
				        xtype: 'combobox',
				        name: 'coachId',
				        itemId: 'coachCombo',
				        fieldLabel: '<span class="syncedField">(sync\'d)</span>  ' +  me.configStore.getConfigByName('coachFieldLabel'),
				        emptyText: 'Select One',
				        store: me.coachesStore,
				        valueField: 'id',
				        displayField: 'fullName',
				        mode: 'local',
				        queryMode: 'local',
				        allowBlank: false,
						forceSelection: true,
						typeAhead: false,
				        editable: false,
						width: 300
					},{
				        fieldLabel: 'Office',
				        itemId: 'officeField',
				        name: 'coachOffice',
						width: 300,
						disabled: true
				    },{
				        fieldLabel: 'Phone',
				        itemId: 'phoneField',
				        name: 'coachPhone',
						width: 300,
						disabled: true
				    },{
				        fieldLabel: 'Email',
				        itemId: 'emailAddressField',
				        name: 'coachEmailAddress',
						width: 300,
						disabled: true
				    },{
				        fieldLabel: 'Department',
				        itemId: 'departmentField',
				        name: 'coachDepartment',
						width: 300,
						disabled: true
				    }]
			    }]
			});
		
		return me.callParent(arguments);
	}
});