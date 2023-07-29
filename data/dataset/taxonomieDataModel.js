Ext.define('ContentContributor.model.taxonomieDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.taxonomieDataModel',

    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'helpText',
            type: 'string'
        },
        {
            name: 'expandable',
            type: 'boolean'
        },
        {
            name: 'multiSelect',
            type: 'boolean'
        },
        {
            name: 'mandatory',
            type: 'boolean'
        },
        {
            name: 'version'
        },
        {
            name: 'id'
        },
        {
            dateFormat: 'timestamp',
            name: 'createTime',
            type: 'date'
        },
        {
            dateFormat: 'timestamp',
            name: 'lastUpdateTime',
            type: 'date'
        },
        {
            name: 'createUser'
        },
        {
            name: 'workspaces'
        },
        {
            name: 'inputAsTree',
            type: 'boolean'
        }
    ]
});