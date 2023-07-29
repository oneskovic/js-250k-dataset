Ext.define('Rubedo.view.newUserWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newUserWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    localiserId: 'newUserWindow',
    height: 173,
    width: 400,
    resizable: false,
    layout: 'fit',
    title: 'Nouvel utilisateur',
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
                            localiserId: 'nameField',
                            anchor: '100%',
                            fieldLabel: 'Nom ',
                            labelWidth: 120,
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            localiserId: 'emailField',
                            anchor: '100%',
                            fieldLabel: 'E-mail ',
                            labelWidth: 120,
                            name: 'email',
                            allowBlank: false,
                            vtype: 'email'
                        },
                        {
                            xtype: 'textfield',
                            localiserId: 'userAccountField',
                            anchor: '100%',
                            fieldLabel: 'Compte utilisateur ',
                            labelWidth: 120,
                            name: 'login',
                            allowBlank: false,
                            vtype: 'alphanum'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'validateBtn',
                            anchor: '100%',
                            id: 'userCreateSubmitBtn',
                            scale: 'large',
                            text: 'Valider'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});