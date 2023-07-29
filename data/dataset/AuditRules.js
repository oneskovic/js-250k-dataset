goog.require('axs.AuditRule');

goog.provide('axs.AuditRules');

(function(){
    var auditRulesByName = {};
    var auditRulesByCode = {};

    /**
     * Instantiates and registers an audit rule.
     * If a conflicting rule is already registered then the new rule will not be added.
     * @param {axs.AuditRule.Spec} spec The object which defines the AuditRule to add.
     * @throws {Error} If the rule duplicates properties that must be unique.
     */
    axs.AuditRules.addRule = function(spec) {
        // axs.AuditRule.specs[spec.name] = spec;  // This would add backwards compatibility
        // create the auditRule before checking props as we can expect the constructor to perform the
        // first layer of sanity checking.
        var auditRule = new axs.AuditRule(spec);
        if (auditRule.code in auditRulesByCode)
            throw new Error('Can not add audit rule with same code: "' + auditRule.code + '"');
        if (auditRule.name in auditRulesByName)
            throw new Error('Can not add audit rule with same name: "' + auditRule.name + '"');
        auditRulesByName[auditRule.name] = auditRulesByCode[auditRule.code] = auditRule;
    };

    /**
     * Gets the audit rule with the given name.
     * @param {string} name The name (or code) of an audit rule.
     * @return {axs.AuditRule}
     */
    axs.AuditRules.getRule = function(name) {
        return auditRulesByName[name] || auditRulesByCode[name] || null;
    };

    /**
     * Gets all registered audit rules.
     * @param {boolean=} opt_namesOnly If true then the result will contain only the rule names.
     * @return {Array.<axs.AuditRule>|Array.<string>}
     */
    axs.AuditRules.getRules = function(opt_namesOnly) {
        var ruleNames = Object.keys(auditRulesByName);
        if(opt_namesOnly)
            return ruleNames;
        return ruleNames.map(function(name) {
            return this.getRule(name);
        }, axs.AuditRules);
    };
})();
