define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/AlfAccordionContainer.html",
        "alfresco/core/Core",
        "alfresco/core/CoreWidgetProcessing",
        "dijit/layout/AccordionContainer",
        "dijit/layout/ContentPane",
        "dojo/dom-construct",
        "dojo/_base/lang",
        "dojo/_base/array"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, AlfCore, CoreWidgetProcessing, AccordionContainer, ContentPane, domConstruct, lang, array) {
   
   return declare([_WidgetBase, _TemplatedMixin, AlfCore, CoreWidgetProcessing], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/AlfAccordionContainer.css"}]
       */
      cssRequirements: [{cssFile:"./css/AlfAccordionContainer.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,
      
      /**
       * This will hold a reference to the accordion widget.
       *
       * @instance
       * @type {object}
       * @default null
       */
      accordionWidget: null,

      /**
       * 
       * @instance
       */
      postCreate: function alfresco_layout_AlfAccordionContainer__postCreate() {
         this.accordionWidget = new AccordionContainer({}, this.accordionNode);
         this.accordionWidget.startup();
         if (this.widgets)
         {
            array.forEach(this.widgets, lang.hitch(this, "addWidget"));
         }
      },
      
      /**
       * 
       * @instance
       * @param {object} widget The widget to add
       * @param {integer} index The index of the widget
       */
      addWidget: function alfresco_layout_AlfAccordionContainer__addWidget(widget, index) {
         var domNode = domConstruct.create("div", {});
         var widgetNode = this.createWidgetDomNode(widget, domNode);
         var w = this.createWidget(widget, widgetNode);

         // It's necessary to add a content pane in order to get the title from the widget to appear
         // and the widget is added into the content pane...
         var cp = new ContentPane({
            title: widget.title,
            content: ""
         });
         cp.addChild(w);
         this.accordionWidget.addChild(cp);
      }
   });
});