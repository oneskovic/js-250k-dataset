Ext.define('extFinder.store.ESFacetteStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ESFacetteStore',

    requires: [
        'extFinder.model.contentsSearchModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        me.addEvents(
            'facettesChanged'
        );

        cfg = cfg || {};
        me.callParent([Ext.apply({
            facettes: [
                
            ],
            activeFacettes: {
                
            },
            autoLoad: false,
            model: 'extFinder.model.contentsSearchModel',
            remoteSort: true,
            storeId: 'ESFacetteStore',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                api: {
                    read: 'elastic-search'
                },
                reader: {
                    type: 'json',
                    getResponseData: function(response) {
                        var data, error;

                        try {
                            data = Ext.decode(response.responseText);
                            this.proxy.facettes=data.facets;
                            if (Ext.isEmpty(data.activeFacets)){
                                data.activeFacets=[ ];
                            }
                            this.proxy.activeFacettes=data.activeFacets;
                            return this.readRecords(data);
                        } catch (ex) {
                            error = new Ext.data.ResultSet({
                                total  : 0,
                                count  : 0,
                                records: [],
                                success: false,
                                message: ex.message
                            });

                            this.fireEvent('exception', this, response, error);
                            console.log(ex);

                            Ext.Logger.warn('Unable to parse the JSON returned by the server');

                            return error;
                        }
                    },
                    messageProperty: 'message',
                    root: 'data'
                }
            },
            listeners: {
                facettesChanged: {
                    fn: me.onJsonstoreFacettesChanged,
                    scope: me
                },
                load: {
                    fn: me.onJsonstoreLoad,
                    scope: me
                },
                beforeload: {
                    fn: me.onJsonstoreBeforeLoad,
                    scope: me
                }
            },
            sorters: {
                direction: 'DESC',
                property: 'score'
            }
        }, cfg)]);
    },

    onJsonstoreFacettesChanged: function(facettes, activeFacettes, eventOptions) {
        extFinder.controller.SearchController.prototype.renderFacets(facettes);
        extFinder.controller.SearchController.prototype.renderActiveFacets(activeFacettes);
    },

    onJsonstoreLoad: function(store, records, successful, eOpts) {
        var rawActiveFacettes = store.getProxy().activeFacettes;
        var refinedActiveFacettes={};
        Ext.Array.forEach(rawActiveFacettes, function(thing){
            if (thing.terms.length==1){
                refinedActiveFacettes[thing.id]=thing.terms[0].term;
            } else {
                refinedActiveFacettes[thing.id]=Ext.Array.pluck(thing.terms, "term");
            }
        });
        store.facettes=store.getProxy().facettes;
        store.activeFacettes=refinedActiveFacettes;
        store.fireEvent("facettesChanged",store.facettes,rawActiveFacettes);
    },

    onJsonstoreBeforeLoad: function(store, operation, eOpts) {
        var source=Ext.clone(store.activeFacettes);
        var adaptedParams= { };
        Ext.Object.each(source, function(key, value, object){
            if (Ext.isArray(value)) {
                adaptedParams[key+"[]"]=value;

            } else {
                adaptedParams[key]=value;
            }
        });
        store.getProxy().extraParams=adaptedParams;
    }

});