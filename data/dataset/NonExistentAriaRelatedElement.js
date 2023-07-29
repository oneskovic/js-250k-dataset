goog.require('axs.AuditRules');
goog.require('axs.browserUtils');
goog.require('axs.constants.Severity');
goog.require('axs.utils');

// TODO(RickSBrown): Consider expanding this beyond ARIA? e.g. 'for' on label.

/**
 * 'ARIA attributes which refer to other elements by ID should refer to elements which exist in the DOM'
 */
axs.AuditRules.addRule({
    name: 'nonExistentAriaRelatedElement',
    heading: 'ARIA attributes which refer to other elements by ID should refer to elements which exist in the DOM',
    url: 'https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#-ax_aria_02--aria-labelledby-attributes-should-refer-to-an-element-which-exists-in-the-dom',
    severity: axs.constants.Severity.SEVERE,
    relevantElementMatcher: function(element) {
        var idrefTypes = ['idref', 'idref_list'];
        var idRefProps = axs.utils.getAriaPropertiesByValueType(idrefTypes);
        var selector = axs.utils.getSelectorForAriaProperties(idRefProps);
        return axs.browserUtils.matchSelector(element, selector);
    },
    test: function(element) {
        var idrefTypes = ['idref', 'idref_list'];
        var idRefProps = axs.utils.getAriaPropertiesByValueType(idrefTypes);
        var selector = axs.utils.getSelectorForAriaProperties(idRefProps);
        var selectors = selector.split(',');
        for (var i = 0, len = selectors.length; i < len; i++) {
            var nextSelector = selectors[i];
            if (axs.browserUtils.matchSelector(element, nextSelector)) {
                var propertyName = nextSelector.match(/aria-[^\]]+/)[0];
                var propertyValueText = element.getAttribute(propertyName);
                var propertyValue = axs.utils.getAriaPropertyValue(propertyName,
                                                                   propertyValueText,
                                                                   element);
                if (!propertyValue.valid)
                    return true;
            }
        }
        return false;
    },
    code: 'AX_ARIA_02'
});
