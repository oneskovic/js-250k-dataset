define(["alfresco/core/ProcessWidgets",
        "dojo/_base/declare",
        "dojo/dom-style",
        "dojo/dom-geometry",
        "dojo/dom-construct",
        "dojo/_base/array"], 
        function(ProcessWidgets, declare, domStyle, domGeom, domConstruct, array) {
   
   return declare([ProcessWidgets], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/AbsoluteCenterWidgets.css"}]
       */
      cssRequirements: [{cssFile:"./css/AbsoluteCenterWidgets.css"}],

      /**
       * The CSS class (or a space separated list of classes) to include in the DOM node.
       * 
       * @instance
       * @type {string}
       * @default "alfresco-layout-AbsoluteCenterWidgets"
       */
      baseClass: "alfresco-layout-AbsoluteCenterWidgets",

      /**
       * Iterate over the created widgets and add the requested margins to them.
       *
       * @instance
       */
      allWidgetsProcessed: function alfresco_layout_AbsoluteCenterWidgets__allWidgetsProcessed(widgets) {
         var heightRequired = 0;
         array.forEach(widgets, function(widget, index) {
            var computedStyle = domStyle.getComputedStyle(widget.domNode);
            var output = domGeom.getMarginBox(widget.domNode, computedStyle);
            heightRequired += output.h;
         }, this);
         domStyle.set(this.domNode, "height", heightRequired + "px");

         if (this.width != null && !isNaN(this.width))
         {
            domStyle.set(this.domNode, "width", this.width + "px");
         }
      }
   });
});