Ext.define('Ssp.view.tools.accommodation.AgencyContacts', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.disabilityagencycontacts',
    width: '100%',
    height: '100%',
    autoScroll: true,
	initComponent: function() {	
        var me = this;
		Ext.apply(me,
				{
		    		bodyPadding: 10,
		    		border: 0,
					items: [{
						xtype: 'form',
						id : 'AccommodationDisabilityAgencies',
					    layout: 'anchor',
					    border: 0,
					    defaults: {
					        anchor: '100%'
					    },
					    defaultType: 'checkbox'
					},{
						xtype: 'form',
						id : 'AccommodationAgencyContactName',
					    layout: 'anchor',
					    border: 0,
					    defaults: {
					        anchor: '95%'
					    },
					    items: [{
	                        xtype: 'textfield',
	                        fieldLabel: 'Name of Contact',
	                        name: 'contactName',
							maxLength: 50
	                    }]
					}]			
				});
		
		return me.callParent(arguments);
	}
});