Ext.define('linkfinder.model.taxonomyTermModel', {
    extend: 'Ext.data.Model',
    alias: 'model.taxonomyTermModel',

    fields: [
        {
            name: 'text',
            type: 'string'
        },
        {
            name: 'id'
        },
        {
            name: 'version'
        },
        {
            name: 'vocabularyId'
        },
        {
            name: 'orderValue',
            sortType: 'asFloat',
            type: 'float'
        },
        {
            name: 'readOnly',
            persist: false,
            type: 'boolean'
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
            defaultValue: false,
            name: 'isNotPage',
            persist: false
        }
    ]
});