/**
 * @module alfresco/forms/controls/MultipleKeyValuePairCreator
 * @extends alfresco/forms/controls/MultipleEntryCreator
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/forms/controls/MultipleEntryCreator", 
        "alfresco/forms/controls/MultipleEntryElementWrapper",
        "alfresco/forms/controls/MultipleKeyValuePairElement"], 
        function(declare, MultipleEntryCreator, MultipleEntryElementWrapper, MultipleKeyValuePairElement) {
   
   return declare([MultipleEntryCreator], {

      /**
       * Indicates whether or not re-ordering should be enabled through the use of drag and drop
       * 
       * @instance
       * @type {boolean}
       * @default false
       */
      enableDND: false,
      
      /**
       * This function should be extended by concrete implementations to create the element to go in the
       * element wrapper.
       * 
       * @instance
       * @param {object} config
       * @returns {object} A new [MultipleKeyValuePairElement]{@link module:alfresco/forms/controls/MultipleKeyValuePairElement} instance
       */
      createElementWidget: function(config) {
         return new MultipleKeyValuePairElement(config);
      }
   });
});