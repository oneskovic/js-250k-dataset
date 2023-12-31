goog.require('axs.AuditRules');
goog.require('axs.browserUtils');
goog.require('axs.constants');
goog.require('axs.utils');

(function(){
    /**
     * @type {axs.AuditRule.Spec}
     */
    var spec = {
        name: 'requiredOwnedAriaRoleMissing',
        heading: 'Elements with ARIA roles must ensure required owned elements are present',
        url: 'https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#-ax_aria_08--elements-with-aria-roles-must-ensure-required-owned-elements-are-present',
        severity: axs.constants.Severity.SEVERE,
        relevantElementMatcher: function(element) {
            if (!axs.browserUtils.matchSelector(element, '[role]'))
                return false;
            var required = getRequired(element);
            return required.length > 0;

        },
        test: function(element) {
            /*
             * Checks that this element contains everything it "must contain".
             */
            var busy = element.getAttribute('aria-busy');
            if (busy === 'true')  // In future this will lower the severity of the warning instead
                return false;  // https://github.com/GoogleChrome/accessibility-developer-tools/issues/101

            var required = getRequired(element);
            for (var i = required.length - 1; i >= 0; i--) {
                 var descendants = axs.utils.findDescendantsWithRole(element, required[i]);
                 if (descendants && descendants.length) {  // if we found at least one descendant with a required role
                     return false;
                 }
             }
             // if we get to this point our element has 'required owned elements' but it does not own them implicitly in the DOM
             var ownedElements = axs.utils.getIdReferents('aria-owns', element);
             for (var i = ownedElements.length - 1; i >= 0; i--) {
                 var ownedElement = ownedElements[i];
                 var ownedElementRole = axs.utils.getRoles(ownedElement, true);
                 if (ownedElementRole && ownedElementRole.roles.length) {
                     ownedElementRole = ownedElementRole.roles[0];
                     for (var j = required.length - 1; j >= 0; j--) {
                        if (ownedElementRole.name === required[j]) {  // if this explicitly owned element has a required role
                            return false;
                        }
                    }
                 }
             }
             return true;  // if we made it here then we did not find the required owned elements in the DOM
        },
        code: 'AX_ARIA_08'
    };

    /**
     * Get a list of the roles this element must contain, if any, based on its ARIA role.
     * @param {Element} element A DOM element.
     * @return {Array.<string>} The roles this element must contain.
     */
    function getRequired(element) {
        var elementRole = axs.utils.getRoles(element);
        if (!elementRole || !elementRole.roles.length)
            return [];
        elementRole = elementRole.roles[0];
        if (!elementRole.valid)
            return [];
        return elementRole.details['mustcontain'] || [];
    }
    axs.AuditRules.addRule(spec);
})();

