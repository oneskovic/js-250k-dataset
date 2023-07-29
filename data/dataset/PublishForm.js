/**
 * This is a work-in-progress widget - use with caution.
 * 
 * @module alfresco/forms/PublishForm
 * @extends module:alfresco/forms/Form
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/forms/Form"], 
        function(declare, Form) {
   
   return declare([Form], {
      
      /**
       * This function overrides the default implementation so that instead of performing an XHR
       * POST operation it simply publishes a topic indicating that the "OK" button has been clicked.
       * 
       * @instance
       */
      _onOK: function alfresco_forms_PublishForm___onOK() {
      },
   
      /**
       * Overridden to hide the buttons.
       * 
       * @instance
       */
      createButtons: function alfresco_forms_PublishForm__createButtons() {
         // TODO: This isn't really accurate for a PublishForm. This should arguably done in a different class
      }
   });
});