Ext.define('Rubedo.view.ExportElementWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ExportElementWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    localiserId: 'exportElementsWindow',
    id: 'ExportElementWindow',
    width: 381,
    resizable: false,
    layout: 'fit',
    title: 'Exporter un élément',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            localiserId: 'mandatoryNameField',
                            anchor: '100%',
                            fieldLabel: 'Nom * ',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'textareafield',
                            localiserId: 'elementDescriptionField',
                            anchor: '100%',
                            fieldLabel: 'Description ',
                            name: 'description'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'exportElementBtn',
                            anchor: '100%',
                            id: 'ExportElementButton',
                            text: 'Exporter cet élément '
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});