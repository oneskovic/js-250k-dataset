WebInspector.DetailsSectionDataGridRow = function(dataGrid, emptyMessage) {
    WebInspector.DetailsSectionRow.call(this, emptyMessage);

    this.element.classList.add(WebInspector.DetailsSectionDataGridRow.StyleClassName);

    this.dataGrid = dataGrid;
};

WebInspector.DetailsSectionDataGridRow.StyleClassName = "data-grid";

WebInspector.DetailsSectionDataGridRow.prototype = {
    constructor: WebInspector.DetailsSectionDataGridRow,

    // Public

    get dataGrid()
    {
        return this._dataGrid;
    },

    set dataGrid(dataGrid)
    {
        if (this._dataGrid === dataGrid)
            return;

        this._dataGrid = dataGrid || null;

        if (dataGrid) {
            dataGrid.element.classList.add("inline");

            this.hideEmptyMessage();
            this.element.appendChild(dataGrid.element);
        } else
            this.showEmptyMessage();
    }
};

WebInspector.DetailsSectionDataGridRow.prototype.__proto__ = WebInspector.DetailsSectionRow.prototype;
