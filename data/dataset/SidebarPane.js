/**
 * @constructor
 * @extends {WebInspector.Object}
 */
WebInspector.SidebarPane = function(title)
{
    this.element = document.createElement("div");
    this.element.className = "pane";

    this.titleElement = document.createElement("div");
    this.titleElement.className = "title";
    this.titleElement.tabIndex = 0;
    this.titleElement.addEventListener("click", this.toggleExpanded.bind(this), false);
    this.titleElement.addEventListener("keydown", this._onTitleKeyDown.bind(this), false);

    this.bodyElement = document.createElement("div");
    this.bodyElement.className = "body";

    this.element.appendChild(this.titleElement);
    this.element.appendChild(this.bodyElement);

    this.title = title;
    this.growbarVisible = false;
    this.expanded = false;
}

WebInspector.SidebarPane.prototype = {
    get title()
    {
        return this._title;
    },

    set title(x)
    {
        if (this._title === x)
            return;
        this._title = x;
        this.titleElement.textContent = x;
    },

    get growbarVisible()
    {
        return this._growbarVisible;
    },

    set growbarVisible(x)
    {
        if (this._growbarVisible === x)
            return;

        this._growbarVisible = x;

        if (x && !this._growbarElement) {
            this._growbarElement = document.createElement("div");
            this._growbarElement.className = "growbar";
            this.element.appendChild(this._growbarElement);
        } else if (!x && this._growbarElement) {
            if (this._growbarElement.parentNode)
                this._growbarElement.parentNode(this._growbarElement);
            delete this._growbarElement;
        }
    },

    get expanded()
    {
        return this._expanded;
    },

    set expanded(x)
    {
        if (x)
            this.expand();
        else
            this.collapse();
    },

    expand: function()
    {
        if (this._expanded)
            return;
        this._expanded = true;
        this.element.addStyleClass("expanded");
        if (this.onexpand)
            this.onexpand(this);
    },

    collapse: function()
    {
        if (!this._expanded)
            return;
        this._expanded = false;
        this.element.removeStyleClass("expanded");
        if (this.oncollapse)
            this.oncollapse(this);
    },

    toggleExpanded: function()
    {
        this.expanded = !this.expanded;
    },

    _onTitleKeyDown: function(event)
    {
        if (isEnterKey(event) || event.keyCode === WebInspector.KeyboardShortcut.Keys.Space.code)
            this.toggleExpanded();
    }
}

WebInspector.SidebarPane.prototype.__proto__ = WebInspector.Object.prototype;
