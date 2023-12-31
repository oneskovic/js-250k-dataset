define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dijit/_OnDijitClickMixin",
        "dijit/_CssStateMixin",
        "alfresco/node/NodeDropTargetMixin",
        "dojo/text!./templates/AlfBreadcrumb.html",
        "alfresco/core/Core",
        "alfresco/documentlibrary/_AlfDocumentListTopicMixin"], 
        function(declare, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, _CssStateMixin, NodeDropTargetMixin, template, AlfCore, _AlfDocumentListTopicMixin) {

   return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin, _CssStateMixin, NodeDropTargetMixin, AlfCore, _AlfDocumentListTopicMixin], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance cssRequirements {Array}
       * @type {object[]}
       * @default [{cssFile:"./css/AlfBreadcrumb.css"}]
       */
      cssRequirements: [{cssFile:"./css/AlfBreadcrumb.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {String}
       */
      templateString: template,
      
      /**
       * The label for the breadcrumb
       * 
       * @instance
       * @type {string} 
       * @default null
       */
      label: null,
      
      /**
       * The path for the breadcrumb.
       * 
       * @instance
       * @type {string} 
       * @default null
       */
      path: null,
      
      /**
       * The target URL for the breadcrumb
       * @instance
       * @type {string}
       * @default null 
       */
      targetUrl: null,
      
      /**
       * The URL type to use for target URLs. Can be overridden as necessary.
       * 
       * @instance
       * @type {string}
       * @default "SHARE_PAGE_RELATIVE"
       */
      targetUrlType: "SHARE_PAGE_RELATIVE",
      
      /**
       * The URL location to use for target URLs. Can be overridden as necessary.
       * 
       * @instance
       * @type {string}
       * @default "CURRENT"
       */
      targetUrlLocation: "CURRENT",
      
      /**
       * Implements the Dojo widget lifecycle method to set the label of the widget
       * @instance
       */
      postCreate: function alfresco_documentlibrary_AlfBreadcrumbTrail__postCreate() {
         if (this.label != null)
         {
            this.breadcrumbNode.innerHTML = this.encodeHTML(this.message(this.label));
         }
         this.addNodeDropTarget(this.domNode);
      },
      
      /**
       * Handles mouse click and keyboard events to navigate to the location that the breadcrumb
       * represents. Navigation is performed by publishing on the "ALF_NAVIGATE_TO_PAGE" topic 
       * 
       * @instance
       * @param {object} evt The click event
       */
      onClick: function alfresco_documentlibrary_AlfBreadcrumb(evt) {
         if (this.targetUrl != null)
         {
            // If a URL has been provided then clicking will navigate to that URL (this is typically the 
            // action for the last breadcrumb in the trail)...
            this.alfPublish("ALF_NAVIGATE_TO_PAGE", { url: this.targetUrl,
                                                      type: this.targetUrlType,
                                                      target: this.targetUrlLocation});
         }
         else
         {
            this.alfPublish("ALF_NAVIGATE_TO_PAGE", { url: "path=" + this.path,
                                                      type: "HASH",
                                                      target: this.targetUrlLocation});
         }
      }
   });
});