/**
 *
 * @module aikauTesting/mockservices/ComboBoxMockXhr
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "aikauTesting/MockXhr",
        "dojo/text!./responseTemplates/ComboBoxTest/tags.json",
        "dojo/text!./responseTemplates/ComboBoxTest/properties.json"], 
        function(declare, MockXhr, tags, properties) {
   
   return declare([MockXhr], {

      /**
       * This sets up the fake server with all the responses it should provide.
       *
       * @instance
       */
      setupServer: function alfresco_testing_mockservices_ComboBoxMockXhr__setupServer() {
         try
         {
            this.server.respondWith("GET",
                                    /(.*)tag:tag-root(.*)/,
                                    [200,
                                     {"Content-Type":"application/json;charset=UTF-8"},
                                     tags]);
            this.server.respondWith("GET",
                                    /(.*)api\/properties(.*)/,
                                    [200,
                                     {"Content-Type":"application/json;charset=UTF-8"},
                                     properties]);
         }
         catch(e)
         {
            this.alfLog("error", "The following error occurred setting up the mock server", e);
         }
      }
   });
});
