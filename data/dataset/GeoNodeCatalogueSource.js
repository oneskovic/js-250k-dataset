/**
 * @requires plugins/CatalogueSource.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = GeoNodeCatalogueSource
 */

/** api: (extends)
 *  plugins/CatalogueSource.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: GeoNodeCatalogueSource(config)
 *
 *    Plugin for creating WMS layers lazily. The difference with the WMSSource
 *    is that the url is configured on the layer not on the source. This means
 *    that this source can create WMS layers for any url. This is particularly
 *    useful when working against a Catalogue Service, such as GeoNode.
 */
gxp.plugins.GeoNodeCatalogueSource = Ext.extend(gxp.plugins.CatalogueSource, {

    /** api: ptype = gxp_geonodecataloguesource */
    ptype: "gxp_geonodecataloguesource",

    /** api: config[rootProperty]
     *  ``String`` Root property in the JSON response. Defaults to 'results'.
     */
    rootProperty: 'results',

    /** api: config[baseParams]
     *  ``Object`` Optional additional params to send in the requests.
     */
    baseParams: null,

    /** api: config[fields]
     *  ``Array`` Fields to use for the JsonReader. By default the following
     *  fields are provided: title, abstract, bounds and URI. Optionally this 
     *  can be overridden by applications to provide different or additional
     *  mappings.
     */
    fields: [
        {name: "title", convert: function(v) {
            return [v];
        }},
        {name: "abstract", mapping: "description"},
        {name: "bounds", mapping: "bbox", convert: function(v) {
            return {
                left: v.minx,
                right: v.maxx,
                bottom: v.miny,
                top: v.maxy
            };
        }},
        {name: "URI", mapping: "download_links", convert: function(v) {
            var result = [];
            for (var i=0,ii=v.length;i<ii;++i) {
                result.push(v[i][3]);
            }
            return result;
        }}
    ],

    /** api: method[createStore]
     *  Create the store that will be used for the GeoNode searches.
     */
    createStore: function() {
        this.store = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy(Ext.apply({
                url: this.url, 
                method: 'GET'
            }, this.proxyOptions || {})),
            baseParams: Ext.apply({
                type: 'layer'
            }, this.baseParams),
            reader: new Ext.data.JsonReader({
                root: this.rootProperty
            }, this.fields)
        });
        gxp.plugins.LayerSource.prototype.createStore.apply(this, arguments);
    },

    /** api: method[getPagingParamNames]
     *  :return: ``Object`` with keys start and limit.
     *
     *  Get the names of the parameters to use for paging.
     */
    getPagingParamNames: function() {
        return {
            start: 'startIndex',
            limit: 'limit'
        };
    },

    /** api: method[filter]
     *  Filter the store by querying the catalogue service.
     *  :param options: ``Object`` An object with the following keys:
     *
     * .. list-table::
     *     :widths: 20 80
     * 
     *     * - ``queryString``
     *       - the search string
     *     * - ``limit`` 
     *       - the maximum number of records to retrieve
     *     * - ``filters``
     *       - additional filters to include in the query
     */
    filter: function(options) {
        var bbox = undefined;
        for (var i=0, ii=options.filters.length; i<ii; ++i) {
            var f = options.filters[i];
            if (f instanceof OpenLayers.Filter.Spatial) {
                bbox = f.value.toBBOX();
                break;
            }
        }
        Ext.apply(this.store.baseParams, {
            'q': options.queryString,
            'limit': options.limit
        });
        if (bbox !== undefined) {
            Ext.apply(this.store.baseParams, {
                'bbox': bbox
            });
        } else {
            delete this.store.baseParams.bbox;
        }
        this.store.load();
    }

});

Ext.preg(gxp.plugins.GeoNodeCatalogueSource.prototype.ptype, gxp.plugins.GeoNodeCatalogueSource);
