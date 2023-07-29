Ext.define('Ssp.controller.tool.actionplan.ActionPlanToolViewController', {
    extend: 'Deft.mvc.ViewController',	
    mixins: [ 'Deft.mixin.Injectable'],
    inject: {
    	person: 'currentPerson',
        personLite: 'personLite'
    },
    constructor: function() {
    	var me=this;   	
    	 var id = me.personLite.get('id');
         var currentId = me.person.get('id');
         if (id != "" && currentId == "") {
 	        me.personService.get(id, {
 	            success: me.newServiceSuccessHandler('person', me.getPersonSuccess, serviceResponses),
 	            failure: me.newServiceFailureHandler('person', me.getPersonFailure, serviceResponses),
 	            scope: me
 	        });
         }
         
		return me.callParent(arguments);
    }, 
    
    getPersonSuccess: function(serviceResponses) {
        var me = this;
        var personResponse = serviceResponses.successes.person;
        me.person.populateFromGenericObject(personResponse);
        me.getView().loadRecord(me.person);

     },

     getPersonFailure: function() {
     }
});