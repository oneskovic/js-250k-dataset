/**
 * @constructor
 * @extends {WebInspector.RequestView}
 * @param {!WebInspector.NetworkRequest} request
 * @param {!WebInspector.ParsedJSON} parsedJSON
 */
WebInspector.RequestJSONView = function(request, parsedJSON)
{
    WebInspector.RequestView.call(this, request);
    this._parsedJSON = parsedJSON;
    this.element.classList.add("json");
}

/**
 * @param {string} text
 * @return {?WebInspector.ParsedJSON}
 */
WebInspector.RequestJSONView.parseJSON = function(text)
{
    var prefix = "";

    // Trim while(1), for(;;), weird numbers, etc. We need JSON start.
    var start = /[{[]/.exec(text);
    if (start && start.index) {
        prefix = text.substring(0, start.index);
        text = text.substring(start.index);
    }

    try {
        return new WebInspector.ParsedJSON(JSON.parse(text), prefix, "");
    } catch (e) {
        return null;
    }
}

/**
 * @param {string} text
 * @return {?WebInspector.ParsedJSON}
 */
WebInspector.RequestJSONView.parseJSONP = function(text)
{
    // Taking everything between first and last parentheses
    var start = text.indexOf("(");
    var end = text.lastIndexOf(")");
    if (start == -1 || end == -1 || end < start)
        return null;

    var prefix = text.substring(0, start + 1);
    var suffix = text.substring(end);
    text = text.substring(start + 1, end);

    try {
        return new WebInspector.ParsedJSON(JSON.parse(text), prefix, suffix);
    } catch (e) {
        return null;
    }
}

WebInspector.RequestJSONView.prototype = {
    /**
     * @return {boolean}
     */
    hasContent: function()
    {
        return true;
    },

    wasShown: function()
    {
        this._initialize();
    },

    _initialize: function()
    {
        if (this._initialized)
            return;
        this._initialized = true;

        var obj = WebInspector.RemoteObject.fromLocalObject(this._parsedJSON.data);
        var title = this._parsedJSON.prefix + obj.description + this._parsedJSON.suffix;
        var section = new WebInspector.ObjectPropertiesSection(obj, title);
        section.expand();
        section.editable = false;
        this.element.appendChild(section.element);
    },

    __proto__: WebInspector.RequestView.prototype
}

/**
 * @constructor
 */
WebInspector.ParsedJSON = function(data, prefix, suffix)
{
    this.data = data;
    this.prefix = prefix;
    this.suffix = suffix;
}
