Ext.define('Rubedo.view.newUTWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newUTWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    localiserId: 'newUserTypeWindow',
    id: 'newUTWindow',
    width: 334,
    resizable: false,
    layout: 'fit',
    constrainHeader: true,
    iconCls: 'user',
    title: 'New user type',
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
                            localiserId: 'newDamTypeNameField',
                            anchor: '100%',
                            fieldLabel: 'Nom ',
                            name: 'type',
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            localiserId: 'newUserTypeSubmitBtn',
                            anchor: '100%',
                            id: 'createNewUTBtn',
                            text: 'Create this new user type'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});