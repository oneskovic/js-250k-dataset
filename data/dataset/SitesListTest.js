/**
 * @author Dave Draper
 */
define(["intern!object",
        "intern/chai!expect",
        "intern/chai!assert",
        "require",
        "alfresco/TestCommon"], 
        function (registerSuite, expect, assert, require, TestCommon) {

   var browser;

   registerSuite({
      name: "Sites List Test",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/SitesList", "Sites List Test").end();
      },

      beforeEach: function() {
         browser.end();
      },

      "Test Initial State": function () {

         // The test page is configured to start on page 2, but there will only be enough results for 1 page
         // so we need to test that actually the first and not second page of data is loaded.
         return browser.findAllByCssSelector(".alfresco-lists-views-layouts-Row")
            .then(function(elements) {
               assert.lengthOf(elements, 1, "Expected to load page 1");
            });
      },

      // MNT-12871 was raised to report that it was not possible to switch page size when on the second page
      // of data. This test has been added to ensure the fix is not regressed.   
      "Test Page Size Chage":  function() {
         return browser.findByCssSelector("#SITES_LIST_PAGINATION_MENU_RESULTS_PER_PAGE_SELECTOR_text")
            .click()
         .end()
         
         // Select 100 results per page...
         .findByCssSelector("#SITES_LIST_PAGINATION_MENU_RESULTS_PER_PAGE_SELECTOR_dropdown .alf-dropdown-menu tr:nth-child(4)")
            .click()
         .end()

         // Check that there are now 2 results (note that the MockXhr service has been fixed so that a page size of 
         // 25 returns 1 result and a page size of 100 returns 2 results)...
         .findAllByCssSelector(".alfresco-lists-views-layouts-Row")
            .then(function(elements) {
               assert.lengthOf(elements, 2, "Expected 2 results");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});