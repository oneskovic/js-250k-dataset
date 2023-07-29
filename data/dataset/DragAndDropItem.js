/**
 * @module alfresco/dnd/DragAndDropItem
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/DragAndDropItem.html",
        "alfresco/core/Core",
        "dojo/on",
        "alfresco/dnd/Constants",
        "dojo/_base/event",
        "dojo/keys"], 
        function(declare, _Widget, _Templated, template, AlfCore, on, Constants, Event, keys) {
   
   return declare([_Widget, _Templated, AlfCore], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {Array}
       */
      cssRequirements: [{cssFile:"./css/DragAndDropItem.css"}],
      
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
       * Handles key presses when the drop target has focus. If the key pressed is the ENTER key
       * then a request will be published to request an item to insert. This is expected to be
       * the currently selected item in a [DragAndDropItems]{@link module:alfresco/dnd/DragAndDropItems}
       * widget.
       * 
       * @instance
       * @param {object} evt The keypress event
       */
      onKeyPress: function alfresco_dnd_DragAndDropTarget__onKeyPress(evt) {
         if (evt && evt.charOrCode === keys.ENTER)
         {
            Event.stop(evt);
            on.emit(this.domNode, Constants.itemSelectedEvent, {
               bubbles: true,
               cancelable: true,
               targetWidget: this
            });
         }
      }
   });
});