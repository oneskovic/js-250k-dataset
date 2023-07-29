Ext.define('Ssp.service.ExportService', {  
    extend: 'Ssp.service.AbstractService',   		
    mixins: [ 'Deft.mixin.Injectable'],
    inject: {
    	apiProperties: 'apiProperties',
    	store: 'directoryPersonSearchStore',
        authenticatedPerson: 'authenticatedPerson'

    },
    initComponent: function() {
		return this.callParent( arguments );
    },
    
    getBaseUrl: function(searchType){
    	var me = this;
		var baseUrl = me.apiProperties.createUrl( me.apiProperties.getItemUrl('exportableCaseload') );
		baseUrl = baseUrl + '/' + searchType;
    	return baseUrl;
    },
    buildExportSearchUrl: function(params) {
        var me=this;

        var activeParams = {};

        for (key in params) {
            if(params[key] && params[key] != null){
                activeParams[key] = params[key];
            }
        }

        var url = me.getBaseUrl('search');
        var encodedUrl = Ext.urlEncode(activeParams);
        return url+'?'+encodedUrl;
    },

    buildExportCaseloadUrl: function( programStatusId, searchType, pagination){
        var me=this;
        var url = me.getBaseUrl(searchType);
        var activeParams = {};

        if(programStatusId)
        {
            activeParams['programStatusId'] = programStatusId;
        }
        activeParams['status'] = 'ACTIVE';
        if ( pagination ) {
            for ( i in pagination ) {
                activeParams[i] = pagination[i];
            }
        }

        var encodedUrl = Ext.urlEncode(activeParams);
        return url+'?'+encodedUrl;
    }
});