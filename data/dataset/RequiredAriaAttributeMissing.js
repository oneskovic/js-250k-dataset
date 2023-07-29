goog.require('axs.AuditRules');
goog.require('axs.browserUtils');
goog.require('axs.constants');
goog.require('axs.properties');
goog.require('axs.utils');

axs.AuditRules.addRule({
    name: 'requiredAriaAttributeMissing',
    heading: 'Elements with ARIA roles must have all required attributes for that role',
    url: 'https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#-ax_aria_03--elements-with-aria-roles-must-have-all-required-attributes-for-that-role',
    severity: axs.constants.Severity.SEVERE,
    relevantElementMatcher: function(element) {
        return axs.browserUtils.matchSelector(element, '[role]');
    },
    test: function(element) {
        var roles = axs.utils.getRoles(element);
        if (!roles.valid)
            return false;  // That's a different error.
        for (var i = 0; i < roles.roles.length; i++) {
            var role = roles.roles[i];
            var requiredProperties = role.details.requiredPropertiesSet;
            for (var property in requiredProperties) {
                var propertyKey = property.replace(/^aria-/, '');
                var propertyDetails = axs.constants.ARIA_PROPERTIES[propertyKey];
                if ('defaultValue' in propertyDetails)
                    continue;
                if (!element.hasAttribute(property)) {
                    var nativelySupported = axs.properties.getNativelySupportedAttributes(element);
                    if (nativelySupported.indexOf(property) < 0) {
                        return true;
                    }
                }
            }
        }
    },
    code: 'AX_ARIA_03'
});
