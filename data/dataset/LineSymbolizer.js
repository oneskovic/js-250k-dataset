/**
 * @include widgets/StrokeSymbolizer.js
 */

/** api: (define)
 *  module = gxp
 *  class = LineSymbolizer
 *  base_link = `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_
 */
Ext.namespace("gxp");

/** api: constructor
 *  .. class:: LineSymbolizer(config)
 *   
 *      Form for configuring a line symbolizer.
 */
gxp.LineSymbolizer = Ext.extend(Ext.Panel, {

    /** api: config[symbolizer]
     *  ``Object``
     *  A symbolizer object that will be used to fill in form values.
     *  This object will be modified when values change.  Clone first if
     *  you do not want your symbolizer modified.
     */
    symbolizer: null,

    initComponent: function() {
        
        this.items = [{
            xtype: "gxp_strokesymbolizer",
            symbolizer: this.symbolizer,
            listeners: {
                change: function(symbolizer) {
                    this.fireEvent("change", this.symbolizer);
                },
                scope: this
            }
        }];

        this.addEvents(
            /**
             * Event: change
             * Fires before any field blurs if the field value has changed.
             *
             * Listener arguments:
             * symbolizer - {Object} A symbolizer with stroke related properties
             *     updated.
             */
            "change"
        ); 

        gxp.LineSymbolizer.superclass.initComponent.call(this);

    }
    
    
});

/** api: xtype = gxp_linesymbolizer */
Ext.reg('gxp_linesymbolizer', gxp.LineSymbolizer);
