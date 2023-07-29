/**
 * This test uses a MockXhr service to test the search service responds as required.
 * 
 * @author Richard Smith
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
      name: "Search Service Test",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/SearchService", "Search Service Test").end();
      },

      beforeEach: function() {
         browser.end();
      },

     "Check there are no results yet": function () {
         return browser.findById("FCTSRCH_SEARCH_RESULTS_LIST")
            .getVisibleText()
            .then(function (text){
               expect(text).to.equal("No results found", "There should not be any results found yet");
            });
      },

      "Check there are the expected number of mocked results": function() {
         return browser.findByCssSelector("#FCTSRCH_SEARCH_FORM div.alfresco-forms-controls-TextBox div.control input[name='searchTerm']")
            .type("test")
            .end()

         .findByCssSelector("#FCTSRCH_SEARCH_FORM div.buttons span.dijitButtonNode")
            .click()
            .end()

         .findAllByCssSelector("#FCTSRCH_SEARCH_RESULTS_LIST tr.alfresco-search-AlfSearchResult")
            .then(function (results){
               expect(results).to.have.length(24, "There should be 24 mocked results");
            });
      },

      "Check there are still the expected number of mocked results": function() {
         return browser.execute("location.hash='#searchTerm=test&allSites=true&repo=false&sortField=cm%3Aname&facetFilters=%7Bhttp%3A%2F%2Fwww.alfresco.org%2Fmodel%2Fcontent%2F1.0%7Dcreator.__.u%7Cadmin&sortAscending=false'")
         .end()

         .findAllByCssSelector("#FCTSRCH_SEARCH_RESULTS_LIST tr.alfresco-search-AlfSearchResult")
            .then(function (results){
               expect(results).to.have.length(24, "There should still be 24 mocked results");
            });
      },

      "Check there are no unexpected queries": function() {
         return browser.findByCssSelector("td.mx-url")
            .getVisibleText()
            .then(function(text) {
               assert(decodeURIComponent(text).indexOf("&query={") === -1, "unexpected query found")
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});