Ext.define('Ssp.controller.tool.profile.CurrentDroppedScheduleViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
    	service: 'transcriptService',
        personLite: 'personLite',
        store: 'currentDroppedScheduleStore'
    },
	init: function() {
		var me=this;
		var personId = me.personLite.get('id');

        me.store.removeAll();
        if(personId != ""){
	    	me.getView().setLoading( true );
	    	
			me.service.getCurrentCourses( personId, {
				success: me.getTranscriptSuccess,
				failure: me.getTranscriptFailure,
				scope: me			
			});
		}
		
		return this.callParent(arguments);
    },
    
    getTranscriptSuccess: function( r, scope ){
    	var me=scope;

        var currentScheduleDroppedCourses = [];

        Ext.Array.each(r, function(courseTranscriptRaw) {
                if(courseTranscriptRaw.statusCode === "W" || courseTranscriptRaw.statusCode === "RW"){
					var courseTranscript = Ext.create('Ssp.model.CourseTranscript', courseTranscriptRaw);
					currentScheduleDroppedCourses.push(courseTranscript);
				}
                	
        });


        me.store.loadData(currentScheduleDroppedCourses);
        me.getView().setLoading( false );
    },
    
    getTranscriptFailure: function( response, scope ){
    	var me=scope;
    	me.getView().setLoading( false );  	
    }
});