define(["dojo/_base/declare",
        "alfresco/menus/AlfFilteringMenuItem",
        "alfresco/documentlibrary/_AlfCreateContentPermissionsMixin",
        "alfresco/documentlibrary/_AlfDocumentListTopicMixin",
        "dojo/_base/lang"], 
        function(declare, AlfFilteringMenuItem, _AlfCreateContentPermissionsMixin, _AlfDocumentListTopicMixin, lang) {
   
   return declare([AlfFilteringMenuItem, _AlfCreateContentPermissionsMixin, _AlfDocumentListTopicMixin], {

      /**
       * Set the i18n scope so that labels are picked up from the wrapped toolbar message scope.
       * 
       * @instance
       * @type {string}
       * @default "Alfresco.DocListToolbar"
       */
      i18nScope: "Alfresco.DocListToolbar",
      
      /**
       * Extended to add additional subscription to listen for changes to the filter. If the filter is not set
       * to a path then it is not possible to create content.
       * 
       * @instance
       */
      postCreate: function alfresco_documentlibrary_AlfCreateContentMenuBarPopup__postCreate() {
         this.alfSubscribe(this.hashChangeTopic, lang.hitch(this, this.onFilterChange));
         this.alfSubscribe(this.userAccessChangeTopic, lang.hitch(this, this.onUserAcess));
         this.inherited(arguments);
      },
   
      /**
       * This function filters the menu item based on the supplied user access payload against the data 
       * in the "permission" attribute that should be set when the item is instantiated. This code is based
       * on the "onUserAccess" function from the original YUI based DocumentLibrary "toolbar.js" widget.
       * 
       * @instance filter
       * @param {object} payload The payload published on the filter topic
       */
      filter: function alfresco_documentlibrary_AlfCreateContentMenuItem__filter(payload) {
         this.alfLog("log", "Filtering request received: ", payload);
         
         // Hide the menu item if necessary 
         if (this.hasPermission(this.permission, payload.userAccess))
         {
            this.show();
         }
         else
         {
            this.hide();
         }
      }
   });
});