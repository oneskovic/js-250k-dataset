Ext.define('Ssp.controller.tool.notes.NotesViewController', {
    extend: 'Deft.mvc.ViewController',
    mixins: [ 'Deft.mixin.Injectable' ],
    inject: {
    	apiProperties: 'apiProperties',
    	service: 'personNoteService',
        person: 'currentPerson',
        store: 'personNotesStore'
    },
	init: function() {
		var me=this;
		var id = me.person.get('id');

        me.store.removeAll();
		if(id != ""){
	    	me.loadNotes(id);
	    }
		
		return this.callParent(arguments);
    },
    
    loadNotes: function(id){
		var me = this;
		if(id != ""){
			me.service.getPersonNotes( id, {
				success: me.getTranscriptSuccess,
				failure: me.getTranscriptFailure,
				scope: me			
			});
		}
	},
	
    getTranscriptSuccess: function( records, scope ){
    	var me=scope;
        me.store.loadData(records);
		me.store.sort([
		    {
		        property : 'dateNoteTaken',
		        direction: 'DESC'
		    },
		    {
		        property : 'author',
		        direction: 'ASC'
		    }]);
        me.getView().setLoading( false );
    },
    
    getTranscriptFailure: function( response, scope ){
    	var me=scope;
    	me.getView().setLoading( false );  	
    }
});