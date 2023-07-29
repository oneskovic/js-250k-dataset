({
    /**
     * Verify css from template is properly injected and present on loaded DOM.
     */
    testStyleCssInjectedIntoDom : {
        browsers : ["-IE7", "-IE8"],
        test : function(cmp) {
            var found = false;
            var cssText = "";
            var styleSheets = document.styleSheets;
            for (var i = 0; i < styleSheets.length; i++) {
                var cssRules = styleSheets[i].cssRules;
                for (var j = 0; j < cssRules.length; j++) {
                    /*
                     * IE10 has a nasty habit of throwing "unknown" (when using typeof) or Member not found. exceptions with
                     * CSS styles that it doesn't understand
                     */
                    if ($A.get("$Browser").isIE10 && typeof cssRules[j].cssText === 'unknown') {
                       continue;
                    }
                    cssText = cssRules[j].cssText;

                    cssText = cssText.replace(/\s+/g, '').toLowerCase();
                    // Different browsers have slightly different formatting so just check enough to feel confident
                    if (cssText.indexOf(".templaterule{border") != -1 && cssText.indexOf("font-style:italic") != -1) {
                        found = true;
                        continue;
                    }
                }
            }
            $A.test.assertTrue(found, "Loaded app does not have template css present.");
        }
   },

    /**
     * Same test as above (testStyleCssInjectedIntoDom), but older versions of IE have different properties on the
     * styleSheets object so try to find the template CSS a slightly different way.
     */
    testStyleCssInjectedIntoDomIE : {
        browsers : ["IE7", "IE8"],
        test : function(cmp) {
            var found = false;
            var styleSheets = document.styleSheets;
            for (var i = 0; i < styleSheets.length; i++) {
                var cssText = styleSheets[i].cssText;
                cssText = cssText.replace(/\s+/g, '').toLowerCase();
                if (cssText.indexOf(".templaterule{border") != -1 && cssText.indexOf("font-style:italic") != -1) {
                    found = true;
                    continue;
                }
            }
            $A.test.assertTrue(found, "Loaded app does not have template css present.");
        }
   }
})