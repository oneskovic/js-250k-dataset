/**
 * This module is intended to be mixed into any widget that needs to map a display value
 * to an actual value (e.g. when a value should be represented by something more user friendly).
 * It was written with the intention of being mixed into both the 
 * [Property]{@link module:alfresco/renderers/Property} and 
 * [MultipleEntryElement]{@link module:alfresco/forms/controls/MultipleEntryElement} modules.
 * Widgets that mixin in this module can then accept a 
 * [valueDisplayMap]{@link module:alfresco/core/ValueDisplayMapMixin#valueDisplayMap} attribute
 * that is intended to be in the same format as the "fixed" attribute of the
 * [optionsConfig]{@link module:alfresco/forms/controls/BaseFormControl#optionsConfig} form control
 * configuration (e.g. an array of objects that contain "label" and "value" attributes).
 * 
 * @module alfresco/core/ValueDisplayMapMixin
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array"], 
        function(declare, lang, array) {
   
   return declare(null, {
      
      /**
       * This should be configured to be the map of values to display labels.
       *
       * @instance
       * @type {object}
       * @default null
       */
      valueDisplayMap: null,

      /**
       * Maps the supplied value to the display value that represents it. If no mapped
       * display value is found then the original value is returned.
       *
       * @instance
       * @param {string} value The value to map
       * @returns {string} The mapped display value
       */
      mapValueToDisplayValue: function alfresco_core_ValueDisplayMapMixin__mapValueToDisplayValue(value) {
         var displayValue = value;
         if (this.valueDisplayMap != null)
         {
            var mappedValue = null;
            for (var i=0; i<this.valueDisplayMap.length && mappedValue === null; i++) {
               var currEntry = this.valueDisplayMap[i];
               if (currEntry.value === value && currEntry.label !== null)
               {
                  mappedValue = currEntry.label;
               }
            }
            displayValue = (mappedValue !== null) ? mappedValue : value;
         }
         return displayValue;
      }
   });
});