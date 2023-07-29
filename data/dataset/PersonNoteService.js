Ext.define('Ssp.service.PersonNoteService', {  
    extend: 'Ssp.service.AbstractService',   		
    mixins: [ 'Deft.mixin.Injectable'],
    inject: {
    	apiProperties: 'apiProperties'
    },
    initComponent: function() {
		return this.callParent( arguments );
    },

    getBaseUrl: function( id ){
		var me=this;
		var baseUrl = me.apiProperties.createUrl( me.apiProperties.getItemUrl('personNote') );
    	baseUrl = baseUrl.replace('{id}', id);
    	return baseUrl;
    },

    getPersonNotes: function ( id, callbacks ) {
        var me = this;
        me.doGet(id, callbacks,  me.getBaseUrl( id ) );
    },

    doGet: function( personId, callbacks, url ) {
        var me=this;
        var success = function( response ){
            callbacks.success( Ext.decode(response.responseText), callbacks.scope );
        };

        var failure = function( response ){
            me.apiProperties.handleError( response );
            callbacks.failure( response, callbacks.scope );
        };

        me.apiProperties.makeRequest({
            url: url,
            method: 'GET',
            successFunc: success,
            failureFunc: failure,
            scope: me
        });
    }
});