Ext.define('Rubedo.model.masquesDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.masquesDataModel',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'text',
            type: 'string'
        },
        {
            name: 'site'
        },
        {
            name: 'rows',
            type: 'auto'
        },
        {
            name: 'blocks'
        },
        {
            name: 'id'
        },
        {
            name: 'version',
            type: 'auto'
        },
        {
            dateFormat: 'timestamp',
            name: 'lastUpdateTime',
            type: 'date'
        },
        {
            dateFormat: 'timestamp',
            name: 'createTime',
            type: 'date'
        },
        {
            name: 'createUser'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'mainColumnId'
        },
        {
            defaultValue: {
                showInDiv: false
            },
            name: 'pageProperties'
        }
    ]
});