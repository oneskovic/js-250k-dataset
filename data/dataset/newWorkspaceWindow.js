Ext.define('Rubedo.view.newWorkspaceWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newWorkspaceWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    localiserId: 'newWorkspaceWindow',
    height: 112,
    width: 400,
    constrain: true,
    resizable: false,
    layout: 'fit',
    title: 'Nouvel espace de travail',
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
                            fieldLabel: 'Nom',
                            name: 'text',
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            localiserId: 'createNewWorkspaceBtn',
                            anchor: '100%',
                            id: 'newWorkspaceSublitBtn',
                            scale: 'medium',
                            text: 'Créer un nouvel espace de travail'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});