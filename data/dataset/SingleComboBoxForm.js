/**
 * This extends the [SingleTextFieldForm]{@link module:alfresco/forms/SingleTextFieldForm} to
 * replace the text field with a [ComboBox]{@link module:alfresco/forms/controls/ComboBox}. As such
 * it is necessary to provide additional configuration information that the 
 * [ComboBox]{@link module:alfresco/forms/controls/ComboBox} can use to retrieve the options to
 * be displayed.
 * 
 * @module alfresco/forms/SingleComboBoxForm
 * @extends module:alfresco/forms/SingleTextFieldForm
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/forms/SingleTextFieldForm",
        "alfresco/forms/controls/ComboBox"], 
        function(declare, SingleTextFieldForm) {
   
   return declare([SingleTextFieldForm], {
      
      /**
       * This is the attribute that will be queried in each returned item for the 
       * [ComboBox]{@link module:alfresco/forms/controls/ComboBox}. It defaults to 
       * "name" but can be overridden in configuration as required.
       *
       * @instance
       * @type {string}
       * @default "name"
       */
      queryAttribute: "name",

      /**
       * This is the topic that should be published on in order to request the available
       * options to display in the [ComboBox]{@link module:alfresco/forms/controls/ComboBox}.
       * It defaults to null so will need to be configured when this widget is used.
       *
       * @instance
       * @type {string}
       * @default null
       */
      optionsPublishTopic: null,

      /**
       * This is the payload that will be published in order to request the avilable options to
       * display in the [ComboBox]{@link module:alfresco/forms/controls/ComboBox}. It defaults 
       * to null so will need to be configured when this widget is used
       *
       * @instance
       * @type {object}
       * @default null
       */
      optionsPublishPayload: null,

      /**
       * Overridden to set the "widgets" attribute to be a single
       * [ComboBox]{@link module:alfresco/forms/controls/ComboBox}.
       *
       * @instance
       */
      postMixInProperties: function alfresco_forms_SingleComboBoxForm__postMixInProperties() {
         this.widgets = [
            {
               name: "alfresco/forms/controls/ComboBox",
               assignTo: "entryField",
               config: {
                  label: (this.textBoxLabel) ? this.message(this.textBoxLabel) : "",
                  name: this.textFieldName,
                  requirementConfig: {
                     initialValue: true
                  },
                  iconClass: (this.textBoxIconClass) ? this.textBoxIconClass : "",
                  additionalCssClasses: (this.textBoxCssClasses) ? this.textBoxCssClasses : "",
                  optionsConfig: {
                     queryAttribute: this.queryAttribute,
                     publishTopic: this.optionsPublishTopic,
                     publishPayload: this.optionsPublishPayload
                  }
               }
            }
         ];
      }
   });
});