Ext.define('Rubedo.model.directoryModel', {
    extend: 'Ext.data.Model',
    alias: 'model.directoryModel',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'text',
            type: 'string'
        },
        {
            name: 'version',
            type: 'int'
        },
        {
            name: 'id'
        },
        {
            name: 'orderValue',
            sortType: 'asFloat',
            type: 'float'
        },
        {
            convert: function(v, rec) {
                return(false);
            },
            name: 'leaf',
            persist: false,
            type: 'boolean'
        },
        {
            defaultValue: true,
            name: 'expandable',
            type: 'boolean'
        },
        {
            name: 'workspace'
        },
        {
            name: 'inheritWorkspace',
            type: 'boolean'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'filePlan'
        },
        {
            name: 'themeId'
        }
    ]
});