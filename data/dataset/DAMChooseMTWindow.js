Ext.define('Rubedo.view.DAMChooseMTWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.DAMChooseMTWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    localiserId: 'chooseDamTypeWindow',
    height: 119,
    id: 'DAMChooseMTWindow',
    width: 400,
    resizable: false,
    layout: 'fit',
    title: 'Choissez un type de média',
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
                            xtype: 'combobox',
                            localiserId: 'chooseDamTypeField',
                            anchor: '100%',
                            fieldLabel: 'Type',
                            name: 'typeId',
                            allowBlank: false,
                            editable: false,
                            displayField: 'type',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'MediaTypesForDAM',
                            valueField: 'id'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'chooseDamTypeSubmitBtn',
                            anchor: '100%',
                            id: 'addDamAfterTypeBtn',
                            scale: 'large',
                            text: 'Créer un nouveau média de ce type'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});