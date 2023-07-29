Ext.define('Rubedo.view.RichTextConfigurator', {
    extend: 'Ext.window.Window',
    alias: 'widget.RichTextConfigurator',

    requires: [
        'Rubedo.view.CKEField',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    localiserId: 'rteConfigWindow',
    height: 360,
    width: 667,
    constrain: true,
    resizable: false,
    layout: 'fit',
    title: 'Editeur de texte riche',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'CKEField',
                    CKETBConfig: 'Email',
                    hideLabel: true,
                    name: 'html'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            localiserId: 'validateBtn',
                            id: 'richTextConfiguratorSubmit',
                            iconCls: 'ouiSpetit',
                            text: 'Valider',
                            listeners: {
                                click: {
                                    fn: me.onRichTextConfiguratorSubmitClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onRichTextConfiguratorSubmitClick: function(button, e, eOpts) {
        var field = button.up().up().getComponent(0);
        if (field.isValid()) {
            if (button.directMode){
                var target=Ext.getCmp(button.targetedId);
                target.setValue(field.getValue());
                button.up().up().close();
            } else {
                var target=Ext.getCmp(button.targetedId);
                target.itemConfig.html=field.getValue();
                button.up().up().close();
                target.sync();
            }
        }

    }

});