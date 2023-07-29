Ext.define('Ext.org.OrgPanel', {
    extend: 'Ext.panel.Panel',
    requires: 'Ext.layout.container.Border',
    
    layout: 'border',
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'albumtree',
                region: 'west',
                padding: 5,
                width: 200
            },
            {
                xtype: 'panel',
                title: 'My Images',
                layout: 'fit',
                region: 'center',
                padding: '5 5 5 0',
                items: {
                    xtype: 'imageview',
                    /*  (add a '/' at the front of this line to turn this on)
                    listeners: {
                        containermouseout: function (view, e) {
                            Ext.log('ct', e.type);
                        },
                        containermouseover: function (view, e) {
                            Ext.log('ct', e.type);
                        },
                        itemmouseleave: function (view, record, item, index, e) {
                            Ext.log('item', e.type, ' id=', record.id);
                        },
                        itemmouseenter: function (view, record, item, index, e) {
                            Ext.log('item', e.type, ' id=', record.id);
                        }
                    },
                    trackOver: true
                }
            }
        ];
        
        this.callParent(arguments);
    }
});