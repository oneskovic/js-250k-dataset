/**
 * @include GeoExt/data/WMSDescribeLayerReader.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WMSDescribeLayerStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WMSDescribeLayerStore
 *  
 *      Small helper class to make creating stores for remote WMS layer description
 *      easier.  The store is pre-configured with a built-in
 *      ``Ext.data.HttpProxy`` and :class:`GeoExt.data.WMSDescribeLayerReader`.
 *      The proxy is configured to allow caching and issues requests via GET.
 *      If you require some other proxy/reader combination then you'll have to
 *      configure this with your own proxy or create a basic
 *      store and configure as needed.
 */

/** api: config[format]
 *  ``OpenLayers.Format``
 *  A parser for transforming the XHR response into an array of objects
 *  representing attributes.  Defaults to an ``OpenLayers.Format.WMSDescribeLayer``
 *  parser.
 */

/** api: config[fields]
 *  ``Array | Function``
 *  Either an Array of field definition objects as passed to
 *  ``Ext.data.Record.create``, or a record constructor created using
 *  ``Ext.data.Record.create``.  Defaults to ``["name", "type"]``. 
 */

GeoExt.data.WMSDescribeLayerStore = function(c) {
    c = c || {};
    GeoExt.data.WMSDescribeLayerStore.superclass.constructor.call(
        this,
        Ext.apply(c, {
            proxy: c.proxy || (!c.data ?
                new Ext.data.HttpProxy({url: c.url, disableCaching: false, method: "GET"}) :
                undefined
            ),
            reader: new GeoExt.data.WMSDescribeLayerReader(
                c, c.fields
            )
        })
    );
};
Ext.extend(GeoExt.data.WMSDescribeLayerStore, Ext.data.Store);
