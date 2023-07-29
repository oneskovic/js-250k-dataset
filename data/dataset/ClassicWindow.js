/**
 * This is a simple layout structure that allows for a title and description to be specified as properties and for the
 * configured widgets to be placed underneath. 
 * 
 * @module alfresco/layout/ClassicWindow
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @mixes module:alfresco/core/CoreWidgetProcessing
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/ClassicWindow.html",
        "alfresco/core/Core",
        "alfresco/core/CoreWidgetProcessing",
        "dojo/dom-class"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, AlfCore, CoreWidgetProcessing, domClass) {
   
   return declare([_WidgetBase, _TemplatedMixin, AlfCore, CoreWidgetProcessing], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/ClassicWindow"}]
       */
      cssRequirements: [{cssFile:"./css/ClassicWindow.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,
      
      /**
       * The title to be rendered
       * 
       * @instance
       * @type {string}
       * @default ""
       */
      title: "",

      /**
       * Ensures that the title and description are converted from key to localised message.
       * 
       * @instance
       */
      postMixInProperties: function alfresco_layout_ClassicWindow__postMixInProperties() {
         if (this.title !== "")
         {
            this.title = this.message(this.title);
         }
      },
      
      /**
       * Processes the widgets into the content node.
       * 
       * @instance
       */
      postCreate: function alfresco_layout_ClassicWindow__postCreate() {
         domClass.add(this.domNode, (this.additionalCssClasses != null ? this.additionalCssClasses : ""));
         if (this.widgets != null)
         {
            this.processWidgets(this.widgets, this.contentNode);
         }
      }
   });
});