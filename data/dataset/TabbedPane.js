WebInspector.TabbedPane = function(element)
{
    this.element = element || document.createElement("div");
    this.element.addStyleClass("tabbed-pane");
    this._tabsElement = this.element.createChild("div", "tabbed-pane-header");
    this._contentElement = this.element.createChild("div", "tabbed-pane-content");
    this._tabs = {};
}

WebInspector.TabbedPane.prototype = {
    appendTab: function(id, tabTitle, view)
    {
        var tabElement = document.createElement("li");
        tabElement.textContent = tabTitle;
        tabElement.addEventListener("click", this.selectTab.bind(this, id, true), false);

        this._tabsElement.appendChild(tabElement);
        this._contentElement.appendChild(view.element);

        this._tabs[id] = { tabElement: tabElement, view: view }
    },

    selectTab: function(id, userGesture)
    {
        if (!(id in this._tabs))
            return false;

        if (this._currentTab) {
            this._hideTab(this._currentTab)
            delete this._currentTab;
        }

        var tab = this._tabs[id];
        this._showTab(tab);
        this._currentTab = tab;
        if (userGesture) {
            var event = {tabId: id};
            this.dispatchEventToListeners("tab-selected", event);
        }
        return true;
    },

    _showTab: function(tab)
    {
        tab.tabElement.addStyleClass("selected");
        tab.view.show(this._contentElement);
    },

    _hideTab: function(tab)
    {
        tab.tabElement.removeStyleClass("selected");
        tab.view.visible = false;
    }
}

WebInspector.TabbedPane.prototype.__proto__ = WebInspector.Object.prototype;
