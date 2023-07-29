Ext.namespace("OE.report.datasource.groupBy");

/**
 * Search form panel, builds query form using filter dimensions and results grid using detail dimensions.
 *
 * Selected records are returned on submit using name/value <code>configuration.name</code>.
 */
OE.report.datasource.groupBy.form = function (configuration) {

    var sm = new Ext.grid.RowSelectionModel();

    var gridPanel = new Ext.grid.GridPanel({
        itemId: 'groupByGrid',
        region: 'center',
        store: new Ext.data.Store({
            reader: new Ext.data.ArrayReader({}, [
                {name: 'dimensionId'},
                {name: 'dimension'}
            ]),
            data: configuration.data
        }),
        columns: [
            {id: 'dimension', header: messagesBundle['input.datasource.default.groupBy.columns'], width: 200, dataIndex: 'dimension'}
        ],
        sm: sm,
        border: false,
        autoExpandColumn: 'dimension',
        autoExpandMin: 150,
        deferRowRender: false // for auto-selecting rows
    });

    var resultsFormPanel = new Ext.form.FormPanel({
        layout: 'border',
        border: false,
        monitorValid: true,
        items: [
            {
                xtype: 'textfield',
                inputType: 'hidden',
                name: 'results',
                allowBlank: false,
                getValue: function () {
                    // To return records for get field values
                    return sm.getSelections();
                },
                getRawValue: function () {
                    // For validation
                    return sm.getSelections();
                }
            },
            gridPanel
        ],
        buttons: [
            {
                text: messagesBundle[configuration.dataSource + '.ok'] || messagesBundle['input.datasource.default.ok'],
                formBind: true,
                handler: function () {
                    if (configuration.callback) {
                        configuration.callback(resultsFormPanel.getForm().getFieldValues());
                    }
                },
                scope: configuration
            },
            {
                text: messagesBundle[configuration.dataSource + '.cancel'] || messagesBundle['input.datasource.default.cancel'],
                handler: function () {
                    if (configuration.callback) {
                        configuration.callback();
                    }
                },
                scope: configuration
            }
        ]
    });

    return resultsFormPanel;
};
