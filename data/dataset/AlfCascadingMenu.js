define(["dojo/_base/declare",
        "dijit/PopupMenuItem",
        "alfresco/menus/_AlfMenuItemMixin",
        "alfresco/menus/AlfMenuGroups",
        "alfresco/core/Core"], 
        function(declare, PopupMenuItem, _AlfMenuItemMixin, AlfMenuGroups, AlfCore) {
   
   return declare([PopupMenuItem, _AlfMenuItemMixin, AlfCore], {
      
      /**
       * Overrides the default value provided by the _AlfMenuItemMixin
       * @instance
       * @type {boolean}
       * @default false 
       */
      closeOnClick: false,
      
      /**
       * Ensures that the supplied menu item label is translated.
       * @instance
       */
      postCreate: function alfresco_menus_AlfCascadingMenu__postCreate() {
         this.setupIconNode();
         this.inherited(arguments);
         
         // Create a popup menu and add children to it...
         this.popup = new AlfMenuGroups({pubSubScope: this.pubSubScope, widgets: this.widgets});
         
         // Call the method provided by the _AlfPopupCloseMixin to handle popup close events...
         this.registerPopupCloseEvent();
      }
   });
});