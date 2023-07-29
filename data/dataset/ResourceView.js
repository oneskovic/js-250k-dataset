/**
 * @extends {WebInspector.View}
 * @constructor
 */
WebInspector.ResourceView = function(resource)
{
    WebInspector.View.call(this);
    this.registerRequiredCSS("resourceView.css");

    this.element.addStyleClass("resource-view");
    this.resource = resource;
}

WebInspector.ResourceView.prototype = {
    hasContent: function()
    {
        return false;
    },

    __proto__: WebInspector.View.prototype
}

/**
 * @param {WebInspector.Resource} resource
 */
WebInspector.ResourceView.hasTextContent = function(resource)
{
    if (resource.type.isTextType())
        return true; 
    if (resource.type === WebInspector.resourceTypes.Other)
        return resource.content && !resource.contentEncoded;
    return false;
}

/**
 * @param {WebInspector.Resource} resource
 */
WebInspector.ResourceView.nonSourceViewForResource = function(resource)
{
    switch (resource.type) {
    case WebInspector.resourceTypes.Image:
        return new WebInspector.ImageView(resource);
    case WebInspector.resourceTypes.Font:
        return new WebInspector.FontView(resource);
    default:
        return new WebInspector.ResourceView(resource);
    }
}

/**
 * @extends {WebInspector.SourceFrame}
 * @constructor
 */
WebInspector.ResourceSourceFrame = function(resource)
{
    this._resource = resource;
    WebInspector.SourceFrame.call(this, resource);
}

WebInspector.ResourceSourceFrame.prototype = {
    get resource()
    {
        return this._resource;
    },

    populateTextAreaContextMenu: function(contextMenu, lineNumber)
    {
        contextMenu.appendApplicableItems(this._resource);
        if (this._resource.request)
            contextMenu.appendApplicableItems(this._resource.request);
    },

    __proto__: WebInspector.SourceFrame.prototype
}
