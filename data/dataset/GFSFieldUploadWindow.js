Ext.define('Rubedo.view.GFSFieldUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.GFSFieldUploadWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.button.Button'
    ],

    localiserId: 'gfsUploadWindow',
    height: 102,
    width: 400,
    resizable: false,
    layout: 'fit',
    constrainHeader: true,
    title: 'Upload',
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
                            xtype: 'filefield',
                            localiserId: 'fileField',
                            anchor: '100%',
                            fieldLabel: 'Fichier',
                            name: 'file',
                            allowBlank: false,
                            buttonText: 'Choisir'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().setLoading(true);
                                var me=this;
                                var form=button.up().getForm();
                                form.submit({
                                    clientValidation: true,
                                    url: 'file/put',
                                    params: {

                                    },
                                    success: function(form, action) {
                                        button.up().setLoading(false);
                                        Ext.getCmp(button.up().up().targetField).setValue(action.result.data.id);
                                        button.up().up().close();
                                    },
                                    failure: function(form, action) {
                                        button.up().setLoading(false);
                                        switch (action.failureType) {
                                            case Ext.form.action.Action.CLIENT_INVALID:
                                            Ext.Msg.alert('Erreur', 'Certains champs sont invalides');
                                            break;
                                            case Ext.form.action.Action.CONNECT_FAILURE:
                                            Ext.Msg.alert('Erreur', 'Erreur Ajax');
                                            break;
                                            case Ext.form.action.Action.SERVER_INVALID:
                                            Ext.Msg.alert('Erreur', action.result.msg);
                                        }
                                    }
                                });

                            },
                            localiserId: 'validateBtn',
                            anchor: '50%',
                            margin: '0 10 0 0',
                            iconCls: 'ouiSpetit',
                            text: 'Valider'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                button.up().up().close();
                            },
                            localiserId: 'cancelBtn',
                            anchor: '50%',
                            margin: '0 0 0 10',
                            iconCls: 'close',
                            text: 'Annuler'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});