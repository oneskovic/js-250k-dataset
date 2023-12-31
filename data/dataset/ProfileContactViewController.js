Ext.define('Ssp.controller.tool.profile.ProfileContactViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
    	appEventsController: 'appEventsController',
        person: 'currentPerson',
        personLite: 'personLite',
        personService: 'personService',
        configStore: 'configStore',
		authenticatedPerson: 'authenticatedPerson',
		formUtils: 'formRendererUtils'
    },
    
    control: {
    	
    	birthDateField: '#birthDate',
    	addressField: '#address',
    	alternateAddressInUseField: '#alternateAddressInUse',
    	alternateAddressField: '#alternateAddress',
		primaryEmailAddressField: '#primaryEmailAddress',
		primaryEmailAddress: {
            click :    'onPrimaryEmailAddressClick'
		},    
        editButton: {
    		click: 'onEditClick'
    	}        
           
        
		
    },
	init: function() {
		var me=this;
		
		var studentIdAlias = me.configStore.getConfigByName('studentIdAlias');
		var id =  me.personLite.get('id');
		me.getView().getForm().reset();

			
		
		if (id != "")
		{
			// display loader
			me.getView().setLoading( true );
			me.personService.get( id, {
				success: me.getPersonSuccess,
				failure: me.getPersonFailure,
				scope: me
			});
		}
		
		return me.callParent(arguments);
    },
    
    getPersonSuccess: function( r, scope ){
    	var me=scope;
		var birthDateField = me.getBirthDateField();
		
		var primaryEmailAddressField = me.getPrimaryEmailAddressField();
		
		var id= me.personLite.get('id');
		var studentIdAlias = me.configStore.getConfigByName('studentIdAlias');
		var fullName;
		var alternateAddressInUse = "No";
		var primaryEmailWithLink = "";
		
		// load the person data
		me.person.populateFromGenericObject(r);		
		
    	fullName = me.person.getFullName();
   	
			
		
		// load general student record
		me.getView().loadRecord( me.person );
		
		// load additional values
		
		birthDateField.setValue( me.person.getFormattedBirthDate() );
		
		primaryEmailWithLink = '<u>' + me.person.get('primaryEmailAddress') + '</u>';
		
		
		primaryEmailAddressField.setValue(primaryEmailWithLink);
		

		me.getAddressField().setValue(me.person.buildAddress());
		
		me.getAlternateAddressField().setValue(me.person.buildAlternateAddress());
		
		if (me.person.get('alternateAddressInUse')!=null)
		{
			if (me.person.get('alternateAddressInUse')===true)
			{
				alternateAddressInUse = "Yes";
			}
		}
		
		me.getAlternateAddressInUseField().setValue( alternateAddressInUse );
		
		// hide the loader
    	me.getView().setLoading( false ); 
    },
    
    getPersonFailure: function( response, scope){
    	var me=scope;
    	me.getView().setLoading( false );
    },
	
	onPrimaryEmailAddressClick: function(){
        var me = this;
        if (me.person.get('primaryEmailAddress')) {
            window.location = 'mailto:' + me.person.get('primaryEmailAddress');
        }
    },
	
	onEditClick: function(button){
		this.displayIntake();
	},	
	displayIntake: function(){
        var me = this;
        var comp;
        if (me.authenticatedPerson.hasAccess('STUDENTINTAKE_TOOL')) {
            comp = me.formUtils.loadDisplay('tools', 'studentintake', true, {});
        }
        else {
            me.authenticatedPerson.showUnauthorizedAccessAlert();
        }	
     }	
});