WebInspector.ExtensionPanel = function(id, label, iconURL, options)
{
    this.toolbarItemLabel = label;
    this._addStyleRule(".toolbar-item." + id + " .toolbar-icon", "background-image: url(" + iconURL + ");");
    WebInspector.Panel.call(this, id);
    this._initialize(options);
}

WebInspector.ExtensionPanel.prototype = {
    get defaultFocusedElement()
    {
        return this.sidebarTreeElement || this.element;
    },

    updateMainViewWidth: function(width)
    {
        this.bodyElement.style.left = width + "px";
        this.resize();
    },

    searchCanceled: function(startingNewSearch)
    {
        WebInspector.extensionServer.notifySearchAction(this._id, "cancelSearch");
        WebInspector.Panel.prototype.searchCanceled.apply(this, arguments);
    },

    performSearch: function(query)
    {
        WebInspector.extensionServer.notifySearchAction(this._id, "performSearch", query);
        WebInspector.Panel.prototype.performSearch.apply(this, arguments);
    },

    jumpToNextSearchResult: function()
    {
        WebInspector.extensionServer.notifySearchAction(this._id, "nextSearchResult");
        WebInspector.Panel.prototype.jumpToNextSearchResult.call(this);
    },

    jumpToPreviousSearchResult: function()
    {
        WebInspector.extensionServer.notifySearchAction(this._id, "previousSearchResult");
        WebInspector.Panel.prototype.jumpToPreviousSearchResult.call(this);
    },

    _addStyleRule: function(selector, body)
    {
        var style = document.createElement("style");
        style.textContent = selector + " { " + body + " }";
        document.head.appendChild(style);
    },

    _initialize: function (options) 
    {    
        var aardwolfIP = options.ip,
            iframe = document.createElement('iframe');

        iframe.src = "http://" + aardwolfIP + ":8501/ui/index.html";
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        this.element.appendChild(iframe);
     }
}

WebInspector.ExtensionPanel.prototype.__proto__ = WebInspector.Panel.prototype;

WebInspector.ExtensionWatchSidebarPane = function(title, id)
{
    WebInspector.SidebarPane.call(this, title);
    this._id = id;
}

WebInspector.ExtensionWatchSidebarPane.prototype = {
    setObject: function(object, title)
    {
        this._setObject(WebInspector.RemoteObject.fromLocalObject(object), title);
    },

    setExpression: function(expression, title)
    {
        InspectorBackend.evaluate(expression, "extension-watch", false, this._onEvaluate.bind(this, title));
    },

    _onEvaluate: function(title, result)
    {
        this._setObject(WebInspector.RemoteObject.fromPayload(result), title);
    },

    _setObject: function(object, title)
    {
        this.bodyElement.removeChildren();
        var section = new WebInspector.ObjectPropertiesSection(object, title, null, true);
        if (!title)
            section.headerElement.addStyleClass("hidden");
        section.expanded = true;
        this.bodyElement.appendChild(section.element);
        WebInspector.extensionServer.notifyExtensionWatchSidebarUpdated(this._id);
    }
}

WebInspector.ExtensionWatchSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
