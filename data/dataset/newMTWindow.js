Ext.define('Rubedo.view.newMTWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.newMTWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    localiserId: 'newDamTypeWindow',
    height: 137,
    id: 'newMTWindow',
    width: 334,
    resizable: false,
    layout: 'fit',
    constrainHeader: true,
    iconCls: 'mediaTypes',
    title: 'Nouveau type de média',
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
                            xtype: 'combobox',
                            localiserId: 'newDamTypeMainFileTypeField',
                            anchor: '100%',
                            fieldLabel: 'Type de fichier principal',
                            name: 'mainFileType',
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            store: [
                                'Image',
                                'Document',
                                'Video',
                                'Animation',
                                'Audio'
                            ]
                        },
                        {
                            xtype: 'button',
                            localiserId: 'newDamTypeSubmitBtn',
                            anchor: '100%',
                            id: 'createNewMTBtn',
                            text: 'Créer un nouveau type de média'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});