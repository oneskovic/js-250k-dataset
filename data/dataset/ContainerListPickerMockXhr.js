/**
 * @module aikauTesting/mockservices/ContainerListPickerMockXhr
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "aikauTesting/MockXhr",
        "dojo/text!./responseTemplates/ContainerListPicker/RecentSites.json",
        "dojo/text!./responseTemplates/ContainerListPicker/Site.json",
        "dojo/text!./responseTemplates/ContainerListPicker/DocumentLibrary.json"], 
        function(declare, MockXhr, RecentSites, Site, DocumentLibrary) {
   
   return declare([MockXhr], {

      /**
       * This sets up the fake server with all the responses it should provide.
       *
       * @instance
       */
      setupServer: function alfresco_testing_mockservices_ContainerListPickerMockXhr__setupServer() {
         try
         {
            this.server.respondWith("GET",
                                    "/aikau/proxy/alfresco/api/people/guest/sites/recent",
                                    [200,
                                     {"Content-Type":"application/json;charset=UTF-8",
                                     "Content-Length":982},
                                     RecentSites]);
            this.server.respondWith("GET",
                                    "/aikau/proxy/alfresco/slingshot/doclib/treenode/node/alfresco/company/home/?perms=false&children=false&max=500&libraryRoot=workspace%3A%2F%2FSpacesStore%2Fb4cff62a-664d-4d45-9302-98723eac1319",
                                    [200,
                                     {"Content-Type":"application/json;charset=UTF-8",
                                     "Content-Length":3028},
                                     Site]);
            this.server.respondWith("GET",
                                    "/aikau/proxy/alfresco/slingshot/doclib/treenode/node/alfresco/company/home/documentLibrary/?perms=false&children=false&max=500&libraryRoot=workspace%3A%2F%2FSpacesStore%2Fb4cff62a-664d-4d45-9302-98723eac1319",
                                    [200,
                                     {"Content-Type":"application/json;charset=UTF-8",
                                     "Content-Length":2563},
                                     DocumentLibrary]); 
            this.alfPublish("ALF_MOCK_XHR_SERVICE_READY", {});
            
         }
         catch(e)
         {
            this.alfLog("error", "The following error occurred setting up the mock server", e);
         }
      }
   });
});
