/**
 * 
 * 
 * @module alfresco/creation/DragPalette
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/DragWidgetPalette.html",
        "dojo/text!./templates/WidgetTemplate.html",
        "alfresco/core/Core",
        "dojo/dnd/Source",
        "dojo/_base/lang",
        "dojo/string",
        "dojo/dom-construct"], 
        function(declare, _Widget, _Templated, template, WidgetTemplate, AlfCore, Source, lang, stringUtil, domConstruct) {
   
   return declare([_Widget, _Templated, AlfCore], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      cssRequirements: [{cssFile:"./css/DragWidgetPalette.css"}],
      
      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      i18nRequirements: [{i18nFile: "./i18n/DragWidgetPalette.properties"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {String}
       */
      templateString: template,
      
      /**
       * @instance
       * @type {boolean}
       * @default false
       */
      dragWithHandles: false,
      
      /**
       * @instance
       */
      postCreate: function alfresco_creation_DragWidgetPalette__postCreate() {
         var palette = new Source(this.paletteNode, {
            copyOnly: true,
            selfCopy: false,
            creator: lang.hitch(this, "creator"),
            withHandles: this.dragWithHandles
         });
         palette.insertNodes(false, this.widgetsForPalette);
      },
      
      /**
       * Handles the creation of drag'n'drop avatars. This could check the supplied hint parameter
       * to see if an avatar is required, but since the source doesn't allow self-copying and is not
       * a target in itself then this is not necessary.
       * 
       * @instance
       */
      creator: function alfresco_creation_DragWidgetPalette__creator(item, hint) {
         this.alfLog("log", "Creating", item, hint);
         var node = domConstruct.toDom(stringUtil.substitute(WidgetTemplate, {
            title: (item.name != null) ? item.name : "",
            iconClass: (item.iconClass != null) ? item.iconClass : ""
         }));
         return {node: node, data: item, type: item.type};
      },
      
      /**
       * @instance
       * @returns {object[]}
       */
      widgetsForPalette: null
   });
});