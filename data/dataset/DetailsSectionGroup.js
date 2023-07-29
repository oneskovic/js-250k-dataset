WebInspector.DetailsSectionGroup = function(rows) {
    WebInspector.Object.call(this);

    this._element = document.createElement("div");
    this._element.className = WebInspector.DetailsSectionGroup.StyleClassName;

    this.rows = rows;
};

WebInspector.DetailsSectionGroup.StyleClassName = "group";

WebInspector.DetailsSectionGroup.prototype = {
    constructor: WebInspector.DetailsSectionGroup,

    // Public

    get element()
    {
        return this._element;
    },

    get rows()
    {
        return this._rows;
    },

    set rows(rows)
    {
        this._element.removeChildren();

        this._rows = rows || [];

        for (var i = 0; i < this._rows.length; ++i)
            this._element.appendChild(this._rows[i].element);
    }
};

WebInspector.DetailsSectionGroup.prototype.__proto__ = WebInspector.Object.prototype;
