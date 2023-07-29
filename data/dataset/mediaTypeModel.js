Ext.define('ContentContributor.model.mediaTypeModel', {
    extend: 'Ext.data.Model',
    alias: 'model.mediaTypeModel',

    fields: [
        {
            name: 'type'
        },
        {
            name: 'id'
        },
        {
            name: 'version'
        },
        {
            name: 'fields'
        },
        {
            name: 'vocabularies'
        },
        {
            name: 'mainFileType'
        },
        {
            mapping: 'createUser.fullName',
            name: 'createUser',
            persist: false
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
        }
    ]
});