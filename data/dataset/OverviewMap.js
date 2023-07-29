/**
 * Class: oscar.Control.OverviewMap
 * 
 * The Oscar OverviewMap control creates a small overview map which displays 
 * a zoomed extent of the main map.
 * 
 * Inherits from:
 * - <OpenLayers.Control.OverviewMap>
 */

oscar.Control.OverviewMap= oscar.BaseClass(OpenLayers.Control.OverviewMap, {
    /**
     * Constructor: oscar.Control.OverviewMap
     * 
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
	 *           this instance.
     */
    initialize: function(options) {
        OpenLayers.Control.OverviewMap.prototype.initialize.apply(this, arguments);
	},
    /**
         * APIMethod: draw
         * 
         * Draws the control on screen.
         */
    draw:function() {
        var layers = [];
        for(var l in this.map.layers) {
            if(this.map.layers[l].renderer) continue;
            if(this.map.layers[l].clone) {
                layers.push(this.map.layers[l].clone());
            }
        }
        this.layers = layers;    
        OpenLayers.Control.OverviewMap.prototype.draw.apply(this,arguments);
        $$(this.maximizeDiv).empty();
        $$(this.minimizeDiv).empty();
        return this.div;
    },
	
    /**
     * Constant: CLASS_NAME
     * - oscar.Control.OverviewMap
     */
	CLASS_NAME:"oscar.Control.OverviewMap"
});