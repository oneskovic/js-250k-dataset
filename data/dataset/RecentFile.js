
 Ext.define("PE.model.RecentFile", {
    extend: "Ext.data.Model",
    fields: [{
        type: "int",
        name: "type"
    },
    {
        type: "string",
        name: "title"
    },
    {
        type: "string",
        name: "url"
    },
    {
        type: "string",
        name: "folder"
    }]
});