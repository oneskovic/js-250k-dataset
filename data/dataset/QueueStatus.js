Ext.define('Laboratory.view.QueueStatus', {
    extend: 'Ext.container.Container',
    alias: 'widget.QueueStatus',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        title: 'Queue Status',
        padding: 10,
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Queue'
        }, {
            xtype: 'gridcolumn',
            text: 'Measure'
        }, {
            xtype: 'gridcolumn',
            text: 'Urgent'
        }, {
            xtype: 'gridcolumn',
            text: 'Normal'
        }, {
            xtype: 'gridcolumn',
            text: 'Done'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'displayfield',
        value: 'DEFAULTS',
        fieldLabel: '',
        x: 10,
        y: 140
    }, {
        xtype: 'combobox',
        fieldLabel: 'Specimen Collection',
        labelAlign: 'top',
        x: 10,
        y: 180
    }, {
        xtype: 'combobox',
        fieldLabel: 'Urinalogy',
        labelAlign: 'top',
        x: 210,
        y: 240
    }, {
        xtype: 'combobox',
        fieldLabel: 'Specimen Registration',
        labelAlign: 'top',
        x: 10,
        y: 240
    }, {
        xtype: 'combobox',
        fieldLabel: 'Haematology',
        labelAlign: 'top',
        x: 200,
        y: 180
    }, {
        xtype: 'combobox',
        fieldLabel: 'Approvals',
        labelAlign: 'top',
        x: 400,
        y: 180
    }, {
        xtype: 'textfield',
        fieldLabel: 'Specimen Collection',
        labelAlign: 'top',
        x: 400,
        y: 240
    }, {
        xtype: 'textfield',
        fieldLabel: 'Microbiology',
        labelAlign: 'top',
        x: 200,
        y: 300
    }]

});
