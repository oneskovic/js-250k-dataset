WebInspector.ApplicationCacheFrame = function(frame, manifest, status)
{
    console.assert(frame instanceof WebInspector.Frame);
    console.assert(manifest instanceof WebInspector.ApplicationCacheManifest);

    WebInspector.Object.call(this);
    
    this._frame = frame;
    this._manifest = manifest;
    this._status = status;
};

WebInspector.ApplicationCacheFrame.TypeIdentifier = "application-cache-frame";
WebInspector.ApplicationCacheFrame.FrameURLCookieKey = "application-cache-frame-url";
WebInspector.ApplicationCacheFrame.ManifestURLCookieKey = "application-cache-frame-manifest-url";

WebInspector.ApplicationCacheFrame.prototype = {
    constructor: WebInspector.ApplicationCacheFrame,
    
    // Public

    get frame()
    {
        return this._frame;
    },

    get manifest()
    {
        return this._manifest;
    },

    get status()
    {
        return this._status;
    },
    
    set status(status)
    {
        this._status = status;
    },

    saveIdentityToCookie: function(cookie)
    {
        cookie[WebInspector.ApplicationCacheFrame.FrameURLCookieKey] = this.frame.url;
        cookie[WebInspector.ApplicationCacheFrame.ManifestURLCookieKey] = this.manifest.manifestURL;
    }
};

WebInspector.ApplicationCacheFrame.prototype.__proto__ = WebInspector.Object.prototype;
