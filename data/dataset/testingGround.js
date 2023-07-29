Ext.define('Rubedo.view.testingGround', {
    extend: 'Ext.window.Window',
    alias: 'widget.testingGround',

    requires: [
        'Rubedo.view.embeddedImageField',
        'Ext.form.Panel',
        'Ext.form.field.Hidden'
    ],

    height: 450,
    id: 'testingGround',
    width: 959,
    layout: 'fit',
    title: 'Testing ground',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'tg1Form',
                    bodyPadding: 10,
                    title: 'Test embedded image field',
                    items: [
                        {
                            xtype: 'embeddedImageField',
                            name: 'test'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});