/**
 * @constructor
 * @extends {WebInspector.AuditCategoryImpl}
 */
WebInspector.AuditCategories.PagePerformance = function() {
    WebInspector.AuditCategoryImpl.call(this, WebInspector.AuditCategories.PagePerformance.AuditCategoryName);
}

WebInspector.AuditCategories.PagePerformance.AuditCategoryName = WebInspector.UIString("Web Page Performance");

WebInspector.AuditCategories.PagePerformance.prototype = {
    initialize: function()
    {
        this.addRule(new WebInspector.AuditRules.UnusedCssRule(), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CssInHeadRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.StylesScriptsOrderRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.VendorPrefixedCSSProperties(), WebInspector.AuditRule.Severity.Warning);
    },

    __proto__: WebInspector.AuditCategoryImpl.prototype
}

/**
 * @constructor
 * @extends {WebInspector.AuditCategoryImpl}
 */
WebInspector.AuditCategories.NetworkUtilization = function() {
    WebInspector.AuditCategoryImpl.call(this, WebInspector.AuditCategories.NetworkUtilization.AuditCategoryName);
}

WebInspector.AuditCategories.NetworkUtilization.AuditCategoryName = WebInspector.UIString("Network Utilization");

WebInspector.AuditCategories.NetworkUtilization.prototype = {
    initialize: function()
    {
        this.addRule(new WebInspector.AuditRules.GzipRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.ImageDimensionsRule(), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CookieSizeRule(400), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.StaticCookielessRule(5), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CombineJsResourcesRule(2), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.CombineCssResourcesRule(2), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.MinimizeDnsLookupsRule(4), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.ParallelizeDownloadRule(4, 10, 0.5), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.BrowserCacheControlRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.ProxyCacheControlRule(), WebInspector.AuditRule.Severity.Warning);
    },

    __proto__: WebInspector.AuditCategoryImpl.prototype
}
