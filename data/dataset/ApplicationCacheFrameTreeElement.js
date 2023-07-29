WebInspector.ApplicationCacheFrameTreeElement = function(representedObject)
{
    console.assert(representedObject instanceof WebInspector.ApplicationCacheFrame);

    WebInspector.GeneralTreeElement.call(this, WebInspector.ApplicationCacheFrameTreeElement.StyleClassName, "", "", representedObject, false);

    this.small = true;
    
    this.updateTitles();
};

WebInspector.ApplicationCacheFrameTreeElement.StyleClassName = "application-cache-frame";

WebInspector.ApplicationCacheFrameTreeElement.prototype = {
    constructor: WebInspector.ApplicationCacheFrameTreeElement,

    updateTitles: function()
    {
        var url = this.representedObject.frame.url;
        var parsedURL = parseURL(url);

        this.mainTitle = WebInspector.displayNameForURL(url, parsedURL);

        // Show the host as the subtitle only if it doesn't match the subtitle of the manifest tree element,
        // and it doesn't match the mainTitle.
        var subtitle = WebInspector.displayNameForHost(parsedURL.host);

        // FIXME: This is bad layering. We should not be calling a global object to get this.
        var manifestTreeElement = WebInspector.resourceSidebarPanel.treeElementForRepresentedObject(this.representedObject.manifest);

        var subtitleIsDuplicate = subtitle === this._mainTitle || subtitle === manifestTreeElement.subtitle;
        this.subtitle = subtitleIsDuplicate ? null : subtitle;
    }
};

WebInspector.ApplicationCacheFrameTreeElement.prototype.__proto__ = WebInspector.GeneralTreeElement.prototype;
