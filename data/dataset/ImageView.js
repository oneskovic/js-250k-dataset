/**
 * @extends {WebInspector.ResourceView}
 * @constructor
 */
WebInspector.ImageView = function(resource)
{
    WebInspector.ResourceView.call(this, resource);

    this.element.classList.add("image");
}

WebInspector.ImageView.prototype = {
    /**
     * @return {boolean}
     */
    hasContent: function()
    {
        return true;
    },

    wasShown: function()
    {
        this._createContentIfNeeded();
    },

    _createContentIfNeeded: function()
    {
        if (this._container)
            return;

        var imageContainer = this.element.createChild("div", "image");
        var imagePreviewElement = imageContainer.createChild("img", "resource-image-view");
        imagePreviewElement.addEventListener("contextmenu", this._contextMenu.bind(this), true);

        this._container = this.element.createChild("div", "info");
        this._container.createChild("h1", "title").textContent = this.resource.displayName;

        var infoListElement = document.createElementWithClass("dl", "infoList");

        this.resource.populateImageSource(imagePreviewElement);

        /**
         * @this {WebInspector.ImageView}
         */
        function onImageLoad()
        {
            var content = this.resource.content;
            if (content)
                var resourceSize = this._base64ToSize(content);
            else
                var resourceSize = this.resource.resourceSize;

            var imageProperties = [
                { name: WebInspector.UIString("Dimensions"), value: WebInspector.UIString("%d × %d", imagePreviewElement.naturalWidth, imagePreviewElement.naturalHeight) },
                { name: WebInspector.UIString("File size"), value: Number.bytesToString(resourceSize) },
                { name: WebInspector.UIString("MIME type"), value: this.resource.mimeType }
            ];

            infoListElement.removeChildren();
            for (var i = 0; i < imageProperties.length; ++i) {
                infoListElement.createChild("dt").textContent = imageProperties[i].name;
                infoListElement.createChild("dd").textContent = imageProperties[i].value;
            }
            infoListElement.createChild("dt").textContent = WebInspector.UIString("URL");
            infoListElement.createChild("dd").appendChild(WebInspector.linkifyURLAsNode(this.resource.url, undefined, undefined, true /* externalResource */));
            this._container.appendChild(infoListElement);
        }
        imagePreviewElement.addEventListener("load", onImageLoad.bind(this), false);
        this._imagePreviewElement = imagePreviewElement;
    },

    _base64ToSize: function(content)
    {
        if (!content.length)
            return 0;
        var size = (content.length || 0) * 3 / 4;
        if (content.length > 0 && content[content.length - 1] === "=")
            size--;
        if (content.length > 1 && content[content.length - 2] === "=")
            size--;
        return size;
    },

    _contextMenu: function(event)
    {
        var contextMenu = new WebInspector.ContextMenu(event);
        contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Copy image URL" : "Copy Image URL"), this._copyImageURL.bind(this));
        if (this._imagePreviewElement.src)
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Copy image as Data URL" : "Copy Image As Data URL"), this._copyImageAsDataURL.bind(this));
        contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Open image in new tab" : "Open Image in New Tab"), this._openInNewTab.bind(this));
        contextMenu.show();
    },

    _copyImageAsDataURL: function()
    {
        InspectorFrontendHost.copyText(this._imagePreviewElement.src);
    },

    _copyImageURL: function()
    {
        InspectorFrontendHost.copyText(this.resource.url);
    },

    _openInNewTab: function()
    {
        InspectorFrontendHost.openInNewTab(this.resource.url);
    },

    __proto__: WebInspector.ResourceView.prototype
}
