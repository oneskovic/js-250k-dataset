/**
 * @constructor
 * @extends {WebInspector.View}
 */
WebInspector.EmptyView = function(text)
{
    WebInspector.View.call(this);
    this._text = text;
}

WebInspector.EmptyView.prototype = {
    wasShown: function()
    {
        this.element.className = "storage-empty-view";
        this.element.textContent = this._text;
    },

    set text(text)
    {
        this._text = text;
        if (this.visible)
            this.element.textContent = this._text;
    },
}

WebInspector.EmptyView.prototype.__proto__ = WebInspector.View.prototype;
