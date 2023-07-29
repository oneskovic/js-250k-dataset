/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

define(function (require, exports, module) {
    "use strict";

    function isFontFamilyToken(t) {
        return t.string.toLowerCase() === "font-family" &&
            (t.type === "property" || t.type === "property error");
                    
    }
    
    function isFontNameToken(t) {
        return t.type === "variable" || t.type === "variable-2" || t.type === "string-2";
    }
    
    function isFontNameStringToken(t) {
        return t.type === "string";
    }
    
    function inRuleBody(t) {
        var context = t.state.context || t.state.localState.context;
        
        return t.type !== "property" &&
            t.type !== "property error" &&
            context.type === "prop";
    }
    
    exports.isFontFamilyToken = isFontFamilyToken;
    exports.isFontNameToken = isFontNameToken;
    exports.isFontNameStringToken = isFontNameStringToken;
    exports.inRuleBody = inRuleBody;
});
