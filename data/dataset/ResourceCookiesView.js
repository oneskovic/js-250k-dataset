WebInspector.ResourceCookiesView = function(resource)
{
    WebInspector.View.call(this);
    this.element.addStyleClass("resource-cookies-view");

    this._resource = resource;

    resource.addEventListener("requestHeaders changed", this.show, this);
    resource.addEventListener("responseHeaders changed", this.show, this);
}

WebInspector.ResourceCookiesView.prototype = {
    show: function(parentElement)
    {
        if (!this._resource.requestCookies && !this._resource.responseCookies) {
            if (!this._emptyMsgElement) {
                this._emptyMsgElement = document.createElement("div");
                this._emptyMsgElement.className = "storage-empty-view";
                this._emptyMsgElement.textContent = WebInspector.UIString("This request has no cookies.");
                this.element.appendChild(this._emptyMsgElement);
            }
            WebInspector.View.prototype.show.call(this, parentElement);
            return;
        }

        if (this._emptyMsgElement)
            this._emptyMsgElement.parentElement.removeChild(this._emptyMsgElement);

        if (!this._cookiesTable) {
            this._cookiesTable = new WebInspector.CookiesTable(null, true, true);
            this._cookiesTable.addCookiesFolder(WebInspector.UIString("Request Cookies"), this._resource.requestCookies);
            this._cookiesTable.addCookiesFolder(WebInspector.UIString("Response Cookies"), this._resource.responseCookies);
            this.element.appendChild(this._cookiesTable.element);
        }

        WebInspector.View.prototype.show.call(this, parentElement);
        this._cookiesTable.updateWidths();
    }
}

WebInspector.ResourceCookiesView.prototype.__proto__ = WebInspector.View.prototype;
