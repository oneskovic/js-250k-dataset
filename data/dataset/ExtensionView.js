/**
 * @constructor
 * @extends {WebInspector.View}
 * @param {string} id
 * @param {string} src
 * @param {string} className
 */
WebInspector.ExtensionView = function(id, src, className)
{
    WebInspector.View.call(this);
    this.element.className = "extension-view fill"; // Override

    this._id = id;
    this._iframe = document.createElement("iframe");
    this._iframe.addEventListener("load", this._onLoad.bind(this), false);
    this._iframe.src = src;
    this._iframe.className = className;
    this.setDefaultFocusedElement(this._iframe);

    this.element.appendChild(this._iframe);
}

WebInspector.ExtensionView.prototype = {
    wasShown: function()
    {
        if (typeof this._frameIndex === "number")
            WebInspector.extensionServer.notifyViewShown(this._id, this._frameIndex);
    },

    willHide: function()
    {
        if (typeof this._frameIndex === "number")
            WebInspector.extensionServer.notifyViewHidden(this._id);
    },

    _onLoad: function()
    {
        var frames = /** @type {!Array.<!Window>} */ (window.frames);
        this._frameIndex = Array.prototype.indexOf.call(frames, this._iframe.contentWindow);
        if (this.isShowing())
            WebInspector.extensionServer.notifyViewShown(this._id, this._frameIndex);
    },

    __proto__: WebInspector.View.prototype
}

/**
 * @constructor
 * @extends {WebInspector.VBox}
 * @param {string} id
 */
WebInspector.ExtensionNotifierView = function(id)
{
    WebInspector.VBox.call(this);

    this._id = id;
}

WebInspector.ExtensionNotifierView.prototype = {
    wasShown: function()
    {
        WebInspector.extensionServer.notifyViewShown(this._id);
    },

    willHide: function()
    {
        WebInspector.extensionServer.notifyViewHidden(this._id);
    },

    __proto__: WebInspector.VBox.prototype
}
