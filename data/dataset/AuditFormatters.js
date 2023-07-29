/**
 * @constructor
 */
WebInspector.AuditFormatters = function()
{
}

WebInspector.AuditFormatters.Registry = {
    text: function(text)
    {
        return document.createTextNode(text);
    },

    snippet: function(snippetText)
    {
        var div = document.createElement("div");
        div.textContent = snippetText;
        div.className = "source-code";
        return div;
    },

    concat: function()
    {
        var parent = document.createElement("span");
        for (var arg = 0; arg < arguments.length; ++arg)
            parent.appendChild(WebInspector.auditFormatters.apply(arguments[arg]));
        return parent;
    },

    url: function(url, displayText, allowExternalNavigation)
    {
        var a = document.createElement("a");
        a.href = url;
        a.title = url;
        a.textContent = displayText || url;
        if (allowExternalNavigation)
            a.target = "_blank";
        return a;
    },

    resourceLink: function(url, line)
    {
        // FIXME: use WebInspector.Linkifier
        return WebInspector.linkifyResourceAsNode(url, line, "console-message-url webkit-html-resource-link");
    }
};

WebInspector.AuditFormatters.prototype = {
    /**
     * @param {string|boolean|number|Object} value
     */
    apply: function(value)
    {
        var formatter;
        var type = typeof value;
        var args;

        switch (type) {
        case "string":
        case "boolean":
        case "number":
            formatter = WebInspector.AuditFormatters.Registry.text;
        args = [ value.toString() ];
        break;

        case "object":
            if (value instanceof Node)
                return value;
            if (value instanceof Array) {
                formatter = WebInspector.AuditFormatters.Registry.concat;
                args = value;
            } else if (value.type && value.arguments) {
                formatter = WebInspector.AuditFormatters.Registry[value.type];
                args = value.arguments;
            }
        }
        if (!formatter)
            throw "Invalid value or formatter: " + type + JSON.stringify(value);

        return formatter.apply(null, args);
    },

    /**
     * @param {Object} formatters
     * @param {Object} thisArgument
     * @param {string|boolean|number|Object} value
     */
    partiallyApply: function(formatters, thisArgument, value)
    {
        if (value instanceof Array)
            return value.map(this.partiallyApply.bind(this, formatters, thisArgument));
        if (typeof value === "object" && typeof formatters[value.type] === "function" && value.arguments)
            return formatters[value.type].apply(thisArgument, value.arguments);
        return value;
    }
}

WebInspector.auditFormatters = new WebInspector.AuditFormatters();
