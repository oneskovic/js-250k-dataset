WebInspector.IndexedDatabaseEntryDataGridNode = function(entry)
{
    WebInspector.DataGridNode.call(this, entry);

    this._entry = entry;
};

WebInspector.IndexedDatabaseEntryDataGridNode.prototype = {
    constructor: WebInspector.IndexedDatabaseEntryDataGridNode,
    __proto__: WebInspector.DataGridNode.prototype,

    // Public

    get entry()
    {
        return this._entry;
    },

    createCellContent: function(columnIdentifier, cell)
    {
        var value = this._entry[columnIdentifier];

        if (value instanceof WebInspector.RemoteObject) {
            switch (value.type) {
            case "object":
            case "array":
                var propertiesSection = new WebInspector.ObjectPropertiesSection(value, value.description);
                propertiesSection.editable = false;
                return propertiesSection.element;

            case "string":
                return "\"" + value.description + "\"";

            default:
                return value.description;
            }
        }

        return WebInspector.DataGridNode.prototype.createCellContent.call(this, columnIdentifier, cell);
    }
};
