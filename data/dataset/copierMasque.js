Ext.define('Rubedo.view.copierMasque', {
    extend: 'Ext.window.Window',
    alias: 'widget.copierMasque',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    localiserId: 'maskDupliacteWindow',
    id: 'copieMasqueFenetre',
    width: 400,
    resizable: false,
    layout: 'fit',
    iconCls: 'page_copy',
    title: 'Duplication de masque',
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
                            localiserId: 'mdNewTitleField',
                            anchor: '100%',
                            id: 'copierMasqueTitre',
                            fieldLabel: 'Nouveau titre ',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            localiserId: 'mdnewSiteField',
                            anchor: '100%',
                            id: 'copierMasqueSite',
                            fieldLabel: 'Dans le site ',
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'SitesComboMasks',
                            valueField: 'id',
                            listeners: {
                                afterrender: {
                                    fn: me.onCopierMasqueSiteAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'mdSubmitBtn',
                            anchor: '1',
                            id: 'copierMasque',
                            text: 'Dupliquer ce masque'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onCopierMasqueSiteAfterRender: function(component, eOpts) {
        var results = component.getStore().getRange();
        if ((!Ext.isEmpty(results))&&(results.length==1)){
            component.select(results[0]);
            component.hide();
        }
    }

});