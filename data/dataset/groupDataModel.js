Ext.define('Rubedo.model.groupDataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.groupDataModel',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'rights'
        },
        {
            name: 'members'
        },
        {
            name: 'id'
        },
        {
            name: 'version'
        },
        {
            name: 'createTime',
            type: 'date'
        },
        {
            name: 'updateTime',
            type: 'date'
        },
        {
            name: 'roles'
        },
        {
            name: 'readWorkspaces'
        },
        {
            name: 'writeWorkspaces'
        },
        {
            name: 'canDeleteElements'
        },
        {
            name: 'canWriteUnownedElements'
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
            name: 'defaultWorkspace'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
        },
        {
            name: 'workspace'
        },
        {
            name: 'inheritWorkspace',
            type: 'boolean'
        }
    ]
});