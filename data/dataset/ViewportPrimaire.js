Ext.define('Rubedo.view.ViewportPrimaire', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.ViewportPrimaire',

    requires: [
        'Rubedo.view.EnteteV',
        'Ext.Img',
        'Ext.toolbar.Toolbar'
    ],

    id: 'ViewportPrimaire',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    id: 'desktopCont',
                    layout: 'absolute',
                    items: [
                        {
                            xtype: 'image',
                            anchor: '105%',
                            x: 0,
                            y: 0,
                            id: 'desktopBackGround'
                        },
                        {
                            xtype: 'container',
                            x: 0,
                            y: 0,
                            id: 'boiteAIconesBureau',
                            minHeight: 600,
                            layout: 'absolute'
                        }
                    ]
                },
                {
                    xtype: 'entete'
                }
            ]
        });

        me.callParent(arguments);
    }

});