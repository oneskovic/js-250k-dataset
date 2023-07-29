/**
 * @constructor
 * @extends {WebInspector.VBox}
 * @param {boolean} isVertical
 */
WebInspector.StackView = function(isVertical)
{
    WebInspector.VBox.call(this);
    this._isVertical = isVertical;
    this._currentSplitView = null;
}

WebInspector.StackView.prototype = {
    /**
     * @param {!WebInspector.View} view
     * @param {string=} sidebarSizeSettingName
     * @param {number=} defaultSidebarWidth
     * @param {number=} defaultSidebarHeight
     * @return {!WebInspector.SplitView}
     */
    appendView: function(view, sidebarSizeSettingName, defaultSidebarWidth, defaultSidebarHeight)
    {
        var splitView = new WebInspector.SplitView(this._isVertical, true, sidebarSizeSettingName, defaultSidebarWidth, defaultSidebarHeight);
        splitView.setMainView(view);
        splitView.hideSidebar();

        if (!this._currentSplitView) {
            splitView.show(this.element);
        } else {
            this._currentSplitView.setSidebarView(splitView);
            this._currentSplitView.showBoth();
        }

        this._currentSplitView = splitView;
        return splitView;
    },

    detachChildViews: function()
    {
        WebInspector.View.prototype.detachChildViews.call(this);
        this._currentSplitView = null;
    },

    __proto__: WebInspector.VBox.prototype
}
