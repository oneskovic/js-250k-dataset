/**
 * This mixin was created as common code was required by both the
 * [ComboBox]{@link module:alfresco/forms/controls/ComboBox} and
 * [FilteringSelect]{@link module:alfresco/forms/controls/FilteringSelect}
 * form controls. It provides functions for creating and working with
 * a [ServiceStore]{@link module:alfresco/forms/controls/utilities/ServiceStore}.
 * 
 * @module alfresco/forms/controls/utilities/UseServiceStoreMixin
 * @extends external:dojo/store/JsonRest
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "alfresco/forms/controls/utilities/ServiceStore"], 
        function(declare, lang, ServiceStore) {

   return declare([], {

      /**
       * Creates and returns a new service store.
       * 
       * @instance
       */
      createServiceStore: function alfresco_forms_controls_utilities_UseServiceStoreMixin__createServiceStore() {
         var publishTopic = lang.getObject("optionsConfig.publishTopic", false, this);
         var publishPayload = lang.getObject("optionsConfig.publishPayload", false, this);
         var queryAttribute = lang.getObject("optionsConfig.queryAttribute", false, this);
         var labelAttribute = lang.getObject("optionsConfig.labelAttribute", false, this);
         var valueAttribute = lang.getObject("optionsConfig.valueAttribute", false, this);
         var fixedOptions = lang.getObject("optionsConfig.fixed", false, this);
         var serviceStore = new ServiceStore({
            idProperty: (valueAttribute != null) ? valueAttribute : "value",
            queryAttribute: (queryAttribute != null) ? queryAttribute : "name",
            labelAttribute: (labelAttribute != null) ? labelAttribute : "label",
            valueAttribute: (valueAttribute != null) ? valueAttribute : "value",
            publishTopic: publishTopic,
            publishPayload: publishPayload,
            fixed: fixedOptions
         });
         return serviceStore;
      },

      /**
       * In vanilla Dojo, when you open either a ComboBox or FilteringSelect you will
       * get all options, not those filtered on the current form control value. This
       * function can be called to override the default _startSearchAll function
       * with one that uses the current value.
       *
       * @instance
       */
      showOptionsBasedOnValue: function alfresco_forms_controls_utilities_UseServiceStoreMixin__showOptionsBasedOnValue(control) {
         control._startSearchAll = lang.hitch(control, this.searchAll);
      },

      /**
       * This function is used to get all the available options based on the value
       * currently entered into the ComboBox. It is used when the user clicks on the
       * down arrow (without entering any text) and overrides the default Dojo ComboBox
       * implementation which searches on the empty string.
       *
       * @instance
       */
      searchAll: function alfresco_forms_controls_utilities_UseServiceStoreMixin__searchAll() {
         this._startSearch(this.getValue());
      }
   });
});