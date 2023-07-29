define(["dojo/_base/declare",
        "alfresco/menus/AlfMenuBar",
        "dojo/_base/array",
        "dojo/dom-class"], 
        function(declare, AlfMenuBar, array, domClass) {

   // TODO: Change the keys connection so that up/down cursor keys move between menu items

   return declare([AlfMenuBar], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      cssRequirements: [{cssFile:"./css/AlfVerticalMenuBar.css"}],
      
      /**
       * Instantiates the MenuBar (a custom declared implementation) and processes the widgets assigned to ensure
       * that the labels are localized before being sent for processing.
       * 
       * @instance
       */
      postCreate: function alfresco_menus_AlfMenuBar__postCreate() {
         this.inherited(arguments);

         domClass.add(this.domNode, "alfresco-menus-AlfVerticalMenuBar");
      },
      
      /**
       * Implements the callback to add all of the widgets into the MenuBar.
       * 
       * @instance
       * @param widgets The widgets that have been successfully instantiated.
       */
      allWidgetsProcessed: function alfresco_menus_AlfMenuBar__allWidgetsProcessed(widgets) {
         var _this = this;
         array.forEach(widgets, function(entry, i) {
            _this._menuBar.addChild(entry);
         });
         this._menuBar.placeAt(this.containerNode);
      }
   });
});