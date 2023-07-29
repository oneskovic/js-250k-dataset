/**
 * This test renders examples of Thumbnails.
 * 
 * The test is simple and much of its validity is in the use of slightly damaged or incomplete models to inspect edge cases.
 * 
 * @author Richard Smith
 */
define(["intern!object",
        "intern/chai!expect",
        "require",
        "alfresco/TestCommon"], 
        function (registerSuite, expect, require, TestCommon) {

   var browser;
   registerSuite({
      name: "Thumbnail Tests",

      setup: function() {
         browser = this.remote;
         return TestCommon.loadTestWebScript(this.remote, "/Thumbnail", "Thumbnail Tests").end();
      },

      beforeEach: function() {
         browser.end();
      },

     "Check there are the expected number of thumbnails successfully rendered": function () {
         return browser.findAllByCssSelector("span.alfresco-renderers-Thumbnail")
            .then(function (thumbnails){
               expect(thumbnails).to.have.length(12, "There should be 12 thumbnails successfully rendered");
            });
      },

      "Post Coverage Results": function() {
         TestCommon.alfPostCoverageResults(this, browser);
      }
   });
});