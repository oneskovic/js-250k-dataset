WebInspector.ApplicationCacheManifestTreeElement = function(representedObject)
{
    console.assert(representedObject instanceof WebInspector.ApplicationCacheManifest);

    WebInspector.StorageTreeElement.call(this, WebInspector.ApplicationCacheManifestTreeElement.StyleClassName, "", representedObject);
};

WebInspector.ApplicationCacheManifestTreeElement.StyleClassName = "application-cache-manifest";

WebInspector.ApplicationCacheManifestTreeElement.prototype = {
    constructor: WebInspector.ApplicationCacheManifestTreeElement,

    // Public

    get name()
    {
        if (!this._name)
            this._generateTitles();
    
        return this._name;
    },

    get secondaryName()
    {
        if (!this._secondaryName)
            this._generateTitles();
        
        return this._secondaryName;
    },

    get categoryName()
    {
        return WebInspector.UIString("Application Cache");
    },
    
    _generateTitles: function()
    {
        var parsedURL = parseURL(this.representedObject.manifestURL);

        // Prefer the last path component, with a fallback for the host as the main title.
        this._name = WebInspector.displayNameForURL(this.representedObject.manifestURL, parsedURL);

        // Show the host as the subtitle.
        var secondaryName = WebInspector.displayNameForHost(parsedURL.host);
        this._secondaryName = this._name !== secondaryName ? secondaryName : null;
    }
};

WebInspector.ApplicationCacheManifestTreeElement.prototype.__proto__ = WebInspector.StorageTreeElement.prototype;
