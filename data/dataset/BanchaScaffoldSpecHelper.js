/** helpers */
BanchaScaffoldSpecHelper = {
    sampleModelData: {
        extend: 'Ext.data.Model',
        idProperty: 'id',
        proxy: {
            type: 'direct',
            api: {
                read: function() {}
            }
        },
        fields: [
            {name:'id', type:'int'},
            {name:'name', type:'string'},
            {name:'login', type:'string'},
            {name:'created', type:'date', dateFormat: 'Y-m-d H:i:s'},
            {name:'email', type:'string'},
            {name:'avatar', type:'string'},
            {name:'weight', type:'float'},
            {name:'height', type:'int'}
        ],
        associations: [
            {type:'hasMany', model:'Post', name:'posts'},
            {type:'belongsTo', model:'Country', name:'country'}
        ],
        validations: [
            { type:"range", field:"id", precision:0},
            { type:"presence", field:"name"},
            { type:"length", field:'name', min: 2},
            { type:"length", field:"name", max: 64}
        ],
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }]
    },
    getSampleModel: function(name,/*optional*/config) {
        return Ext.define(name, Ext.applyIf(config || {}, Ext.clone(BanchaScaffoldSpecHelper.sampleModelData)));
    }
};


beforeEach(function() {
    this.addMatchers({
        toEqualConfig: function(expected) {
            var config = Ext.clone(this.actual);
            delete config.scaffold;
            delete config.scaffoldLoadRecord;
            delete config.scaffold;
            delete config.enableCreate;
            delete config.enableUpdate;
            delete config.enableDestroy;
            delete config.enableReset;
            // test
            expect(config).toEqual(expected);
            // test is already done above
            return true;
        }
    });
});
