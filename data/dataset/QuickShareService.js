/**
 * This service handles requests to publicly Share documents and to remove previously shared documents
 * from being publicly accessible.
 *
 * @module alfresco/services/QuickShareService
 * @extends module:alfresco/core/Core
 * @mixes module:alfresco/core/CoreXhr
 * @mixes module:alfresco/services/_QuickShareServiceTopicMixin
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "alfresco/services/_QuickShareServiceTopicMixin",
        "dojo/_base/lang",
        "service/constants/Default"],
        function(declare, AlfCore, CoreXhr, _QuickShareServiceTopicMixin, lang, AlfConstants) {
   
   return declare([AlfCore, CoreXhr, _QuickShareServiceTopicMixin], {
      
      /**
       * Sets up the subscriptions for the RatingsService
       * 
       * @instance
       * @param {array} args Constructor arguments
       */
      constructor: function alfresco_services_QuickShareService__constructor(args) {
         lang.mixin(this, args);
         this.alfSubscribe(this.addQuickShareTopic, lang.hitch(this, "onAddQuickShare"));
         this.alfSubscribe(this.removeQuickShareTopic, lang.hitch(this, "onRemoveQuickShare"));
      },

      /**
       * Returns a URL for quick sharing a node
       * 
       * @instance
       * @param {string} nodeRefUri The nodeRef URI fragment representation
       */
      getAddQuickShareUrl: function alfresco_services_QuickShareService__getRatingsUrl(nodeRefUri) {
         return AlfConstants.PROXY_URI + "api/internal/shared/share/" + nodeRefUri;
      },
      
      /**
       * Returns a URL for removing the the quick share of a node.
       * 
       * @instance
       * @param {string} shareId The id to of the share to remove
       */
      getRemoveQuickShareUrl: function alfresco_services_QuickShareService__getRatingsUrl(shareId) {
         return AlfConstants.PROXY_URI + "api/internal/shared/unshare/" + shareId;
      },
      
      /**
       * Makes a request to quick share an node
       * 
       * @instance
       * @param {object} payload
       */
      onAddQuickShare: function alfresco_services_QuickShareService__onAddRating(payload) {
         var url = lang.getObject("node.jsNode.nodeRef.uri", false, payload);
         if (url != null)
         {
            var alfTopic = (payload.alfResponseTopic != null) ? payload.alfResponseTopic : this.addQuickShareTopic;
            url = this.getAddQuickShareUrl(url);
            this.serviceXhr({url : url,
                             data: null,
                             method: "POST",
                             alfTopic: alfTopic});
         }
      },
      
      /**
       * Makes a request to removes a quick share
       * 
       * @instance
       * @param {object} payload
       */
      onRemoveQuickShare: function alfresco_services_QuickShareService__onRemoveQuickShare(payload) {
         var quickShareId = lang.getObject("node.jsNode.properties.qshare:sharedId", false, payload);
         if (quickShareId != null)
         {
            var alfTopic = (payload.alfResponseTopic != null) ? payload.alfResponseTopic : this.removeQuickShareTopic;
            var url = this.getRemoveQuickShareUrl(quickShareId);
            this.serviceXhr({url : url,
                             data: null,
                             method: "DELETE",
                             alfTopic: alfTopic});
         }
      }
   });
});