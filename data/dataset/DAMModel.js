Ext.define('extFinder.model.DAMModel', {
    extend: 'Ext.data.Model',
    alias: 'model.DAMModel',

    fields: [
        {
            name: 'title'
        },
        {
            name: 'originalFileId'
        },
        {
            name: 'fields'
        },
        {
            name: 'typeId'
        },
        {
            name: 'version',
            type: 'auto'
        },
        {
            name: 'id'
        },
        {
            name: 'taxonomy'
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
            name: 'createUser',
            persist: false
        },
        {
            name: 'fileSize'
        },
        {
            name: 'mainFileType'
        }
    ]
});