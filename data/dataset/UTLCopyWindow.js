Ext.define('Rubedo.view.UTLCopyWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UTLCopyWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    localiserId: 'newLayoutWindowCopy',
    width: 400,
    constrain: true,
    resizable: false,
    layout: 'fit',
    title: 'Copy layout',
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
                            localiserId: 'nameFieldCopy',
                            anchor: '100%',
                            fieldLabel: 'New name',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            localiserId: 'nmSiteFieldCopy',
                            anchor: '100%',
                            id: 'nouveauMasqueSite4',
                            fieldLabel: 'To site',
                            name: 'site',
                            allowBlank: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'SitesComboUTLayouts',
                            valueField: 'id',
                            listeners: {
                                afterrender: {
                                    fn: me.onNouveauMasqueSiteAfterRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            localiserId: 'createNewLayoutBtnCopy',
                            anchor: '100%',
                            id: 'CTLCopyLSubitBtn1',
                            scale: 'medium',
                            text: 'Copy this layout'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onNouveauMasqueSiteAfterRender1: function(component, eOpts) {
        var results = component.getStore().getRange();
        if ((!Ext.isEmpty(results))&&(results.length==1)){
            component.select(results[0]);
            component.hide();
        }
    }

});