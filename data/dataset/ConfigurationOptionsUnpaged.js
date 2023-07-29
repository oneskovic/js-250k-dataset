Ext.define('Ssp.store.reference.ConfigurationOptionsUnpaged', {
    extend: 'Ssp.store.reference.AbstractReferences',
    model: 'Ssp.model.reference.ConfigurationOption',
    constructor: function(){
    	var me=this;
    	me.callParent(arguments);
        Ext.apply(me.getProxy(), {
            url: me.getProxy().url + me.apiProperties.getItemUrl('config'),
			
            extraParams: me.extraParams
        });
		me.on({
			load: {
				fn: function(store, records, state, operation, opts){
		     		var me=store;
		     		// apply student id validator for use in 
		     		// form fields throughout the application
		     		var minStudentIdLen = me.getConfigByName('studentIdMinValidationLength');
		    		var maxStudentIdLen = me.getConfigByName('studentIdMaxValidationLength');
		    		var allowableCharacters = me.getConfigByName('studentIdAllowableCharacters');
		    		// Example RegEx - /(^[1-9]{7,9})/
		    		var regExString = '^[' + allowableCharacters + ']+$';
		    		var validStudentId = new RegExp( regExString );
		            var studentIdValErrorText = 'You should only use the following character list for input: ' + allowableCharacters;
		            me.getConfigModelName('studentIdValidationErrorText').set('value',studentIdValErrorText);
		            me.getConfigModelName('studentIdMinValidationErrorText').set('value','Value should be at least ' + minStudentIdLen + ' characters & no more than ' + maxStudentIdLen + ' characters');
		            me.getConfigModelName('studentIdMaxValidationErrorText').set('value','Value should be at least ' + minStudentIdLen + ' characters & no more than ' + maxStudentIdLen + ' characters');


		    		Ext.apply(Ext.form.field.VTypes, {
		                //  vtype validation function
		                studentIdValidator: function(val, field) {
		                    return validStudentId.test(val);
		                }
		            });
					
				},
				scope: me,
				single: true
			}
		});
    },
    getConfigByName:function(name)
    {
    	var me=this;
    	var index = me.findExact('name',name);
    	if(index >= 0){
    	 var value =  me.getAt(index).get('value');
    	 if(value === 'true')
    		 return true;
    	 if(value === 'false')
    		 return false;
    	 return value;
    	}
    	return null;
    },
    getConfigModelName:function(name)
    {
    	var me=this;
    	var index = me.findExact('name',name);
    	if(index >= 0)
    	 return me.getAt(index);
    	return null;
    }    
});
