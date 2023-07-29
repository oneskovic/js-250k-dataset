Ext.define('Rubedo.view.stockRemoverWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.stockRemoverWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    localiserId: 'removeStockWindow',
    id: 'stockRemoverWindow',
    width: 400,
    layout: 'fit',
    title: 'Remove stock',
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
                            xtype: 'numberfield',
                            localiserId: 'amountToRemoveField',
                            anchor: '100%',
                            id: 'stockRemoverField',
                            fieldLabel: 'Amount to remove',
                            labelWidth: 120,
                            name: 'amount',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            allowDecimals: false,
                            allowExponential: false,
                            minValue: 0
                        },
                        {
                            xtype: 'button',
                            localiserId: 'removeStockFromItemBtn',
                            anchor: '100%',
                            id: 'stockRemoverSubmitBtn',
                            text: 'Remove stock from selected item',
                            listeners: {
                                click: {
                                    fn: me.onStockAdderSubmitBtnClick,
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

    onStockAdderSubmitBtnClick: function(button, e, eOpts) {
        var form=button.up().getForm();
        if (form.isValid()){
            var amount=form.getValues().amount;
            Ext.getCmp("mainStockGrid").getStore().getProxy().extraParams.actionToApply="remove";
            Ext.getCmp("mainStockGrid").getStore().getProxy().extraParams.amountToApply=amount;
            Ext.getCmp("mainStockGrid").getSelectionModel().getLastSelected().set("stock",Ext.getCmp("mainStockGrid").getSelectionModel().getLastSelected().get("stock")-amount);
            button.up().up().close();
        }
    }

});