/**
 * This service accepts widget models and asynchronously generates the dependencies for them.
 * 
 * @module alfresco/services/PreviewService
 * @extends module:alfresco/core/Core
 * @mixes module:alfresco/core/CoreXhr
 * @mixes module:alfresco/services/_PreviewServiceTopicMixin
 */
define(["dojo/_base/declare",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "alfresco/services/_PreviewServiceTopicMixin",
        "dojo/request/xhr",
        "dojo/_base/lang",
        "service/constants/Default"],
        function(declare, AlfCore, CoreXhr, _PreviewServiceTopicMixin, xhr, lang, AlfConstants) {
   
   return declare([AlfCore, CoreXhr, _PreviewServiceTopicMixin], {
      
      /**
       * Sets up the subscriptions for the PreviewService
       * 
       * @instance
       * @param {array} args Constructor arguments
       */
      constructor: function alfresco_services_PreviewService__constructor(args) {
         lang.mixin(this, args);
         this.alfSubscribe(this.requestDependenciesTopic, lang.hitch(this, "generateDependencies"));
      },
      
      /**
       * @instance
       */
      generateDependencies: function alfresco_services_PreviewService__generateDependencies(payload) {
         if (payload != null && payload.model != null)
         {
            var pageDefObject = dojoJson.parse(payload.model);
            var data = {
               jsonContent: pageDefObject,
               widgets: payload.model
            };
            
            this.serviceXhr({
               url: AlfConstants.URL_SERVICECONTEXT + "/service/surf/dojo/xhr/dependencies",
               method: "POST",
               query: query,
               successCallback: this.generateDependenciesSuccess,
               failureCallback: this.generateDependenciesFailure,
               callbackScope: this
            });
         }
         else
         {
            this.alfLog("error", "A request was made to generate the dependencies for a model, but no 'model' attribute was provided in the request", payload);
         }
      },
      
      /**
       * @instance
       * @param {object} response
       * @param {object} originalRequestConfig
       */
      generateDependenciesSuccess: function alfresco_services_PreviewService__generateDependenciesSuccess(response, originalRequestConfig) {
         this.alfPublish(this.requestDependenciesSuccessTopic, {
            response: response,
            originalRequestConfig: originalRequestConfig
         });
      },
      
      /**
       * @instance
       * @param {object} response
       * @param {object} originalRequestConfig
       */
      generateDependenciesFailure: function alfresco_services_PreviewService__generateDependenciesFailure(response, originalRequestConfig) {
         this.availablePagesLoadFailure(this.requestDependenciesFailureTopic, {
            response: response,
            originalRequestConfig: originalRequestConfig
         });
      }
   });
});