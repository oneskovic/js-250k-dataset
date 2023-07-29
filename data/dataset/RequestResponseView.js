/**
 * @constructor
 * @extends {WebInspector.RequestContentView}
 * @param {WebInspector.NetworkRequest} request
 */
WebInspector.RequestResponseView = function(request)
{
    WebInspector.RequestContentView.call(this, request);
}

WebInspector.RequestResponseView.prototype = {
    get sourceView()
    {
        if (!this._sourceView && WebInspector.RequestView.hasTextContent(this.request))
            this._sourceView = new WebInspector.ResourceSourceFrame(this.request);
        return this._sourceView;
    },

    contentLoaded: function()
    {
        if (!this.request.content || !this.sourceView) {
            if (!this._emptyView) {
                this._emptyView = new WebInspector.EmptyView(WebInspector.UIString("This request has no response data available."));
                this._emptyView.show(this.element);
                this.innerView = this._emptyView;
            }
        } else {
            if (this._emptyView) {
                this._emptyView.detach();
                delete this._emptyView;
            }

            this.sourceView.show(this.element);
            this.innerView = this.sourceView;
        }
    },

    __proto__: WebInspector.RequestContentView.prototype
}
