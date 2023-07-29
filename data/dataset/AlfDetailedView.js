define(["dojo/_base/declare",
        "alfresco/lists/views/AlfListView"], 
        function(declare, AlfDocumentListView) {

   return declare([AlfDocumentListView], {

      /**
       * By default the detailed view should have no borders
       *
       * @instance
       * @type {string}
       * @default "no-borders"
       */
      additionalCssClasses: "no-borders",

      /**
       * The configuration for selecting the view (configured the menu item)
       * @instance
       * @type {object}
       * @property {string|null} label The label or message key for the view (as appears in the menus)
       * @property {string|null} iconClass The class to place next to the label
       */
      viewSelectionConfig: {
         label: "doclist.view.detailed.label",
         iconClass: "alf-detailedlist-icon"
      },

      /**
       * Returns the name of the view that is used when saving user view preferences.
       *
       * @instance
       * @returns {string} "detailed"
       */
      getViewName: function alfresco_documentlibrary_views_AlfDocumentListView__getViewName() {
         return "detailed";
      },

      /**
       * The definition of how a single item is represented in the view.
       *
       * @instance
       * @type {object[]}
       */
      widgets: [{
         name: "alfresco/documentlibrary/views/AlfDetailedViewItem",
         config: {
            generatePubSubScope: true
         }
      }]
   });
});