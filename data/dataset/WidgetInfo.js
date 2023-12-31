/**
 * This module is used exclusively in client-debug mode in order to provide information about a specific
 * widget. It is intended to provide a developer with information about the ID of a widget and a code
 * snippet that can be used in a Surf Extension to find the widget in the model in order to work with it.
 * 
 * @module alfresco/debug/WidgetInfo
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dijit/_OnDijitClickMixin",
        "dojo/text!./templates/WidgetInfo.html",
        "dojo/text!./templates/WidgetInfoData.html",
        "alfresco/core/Core",
        "dijit/TooltipDialog",
        "dijit/popup",
        "dojo/string"], 
        function(declare, _Widget, _Templated, _OnDijitClickMixin, template, dataTemplate, AlfCore, TooltipDialog, popup, string) {
   
   return declare([_Widget, _Templated, _OnDijitClickMixin, AlfCore], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      cssRequirements: [{cssFile:"./css/WidgetInfo.css"}],
      
      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      i18nRequirements: [{i18nFile: "./i18n/WidgetInfo.properties"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {String}
       */
      templateString: template,
      
      /**
       * Sets up the image source and it's alt text.
       * 
       * @instance
       */
      postMixInProperties: function alfresco_debug_WidgetInfo__postMixInProperties() {
         this.imgSrc = require.toUrl("alfresco/debug") + "/css/images/info-16.png";
         if (this.displayId)
         {
            this.altText = this.message("widgetInfo.alt.text", {
               0: this.displayId
            });
         }
         else
         {
            this.altText = this.message("widgetInfo.unknown.alt.text");
         }
      },

      /**
       * Handles clicking on the info image and displays a tooltip dialog with information about the
       * selecte widget.
       * 
       * @instance
       */
      showInfo: function alfresco_debug_WidgetInfo__showInfo() {
         if (!this.ttd)
         {
            this.displayIdLabel = this.message("widgetInfo.displayId.label");
            this.displayTypeLabel = this.message("widgetInfo.displayType.label");
            this.displaySnippetLabel = this.message("widgetInfo.displaySnippetLabel.label");
            if (this.displayId !== "")
            {
               this.displaySnippet = "widgetUtils.findObject(model.jsonModel.widgets, \"id\", \"" + this.displayId + "\");";
            }
            else
            {
               this.displaySnippet = "// No widget ID defined";
            }
            var content = string.substitute(dataTemplate, this);
            this.ttd = new TooltipDialog({
               id: this.id + "___TOOLTIP",
               baseClass: "alfresco-debug-WidgetInfoDialog",
               content: content,
               onShow: function(){
                 this.focus();
               },
               _onBlur: function(){
                  popup.close(this.ttd);
               }
            });
         }

         popup.open({
            popup: this.ttd,
            around: this.domNode,
            onCancel: function(){
               popup.close(this.ttd);
            }
         });
      }
   });
});