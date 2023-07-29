WebInspector.LayoutTimelineDataGrid = function(treeOutline, columns, delegate, editCallback, deleteCallback)
{
    WebInspector.TimelineDataGrid.call(this, treeOutline, columns, delegate, editCallback, deleteCallback);

    this._showingHighlight = false;

    this.addEventListener(WebInspector.DataGrid.Event.SelectedNodeChanged, this._layoutDataGridSelectedNodeChanged, this);
}

WebInspector.LayoutTimelineDataGrid.prototype = {
    constructor: WebInspector.LayoutTimelineDataGrid,

    // Protected

    reset: function()
    {
        WebInspector.TimelineDataGrid.prototype.reset.call(this);

        this._hideHighlightIfNeeded();
    },

    callFramePopoverAnchorElement: function()
    {
        return this.selectedNode.elementWithColumnIdentifier("initiatorCallFrame");
    },

    hidden: function()
    {
        WebInspector.TimelineDataGrid.prototype.hidden.call(this);

        this._hideHighlightIfNeeded();
    },

    // Private

    _layoutDataGridSelectedNodeChanged: function(event)
    {
        if (!this.selectedNode) {
            this._hideHighlightIfNeeded();
            return;
        }

        var record = this.selectedNode.record;
        const contentColor = {r: 111, g: 168, b: 220, a: 0.66};
        const outlineColor = {r: 255, g: 229, b: 153, a: 0.66};

        var quad = record.quad;
        if (quad && DOMAgent.highlightQuad) {
            DOMAgent.highlightQuad(quad.toProtocol(), contentColor, outlineColor);
            this._showingHighlight = true;
            return;
        }

        // COMPATIBILITY (iOS 6): iOS 6 included Rect information instead of Quad information. Fallback to highlighting the rect.
        var rect = record.rect;
        if (rect) {
            DOMAgent.highlightRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height, contentColor, outlineColor);
            this._showingHighlight = true;
            return;
        }
    },

    _hideHighlightIfNeeded: function()
    {
        if (this._showingHighlight) {
            DOMAgent.hideHighlight();
            this._showingHighlight = false;
        }
    }
}

WebInspector.LayoutTimelineDataGrid.prototype.__proto__ = WebInspector.TimelineDataGrid.prototype;
