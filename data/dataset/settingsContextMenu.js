Ext.define('Rubedo.view.settingsContextMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.settingsContextMenu',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.Separator'
    ],

    frame: true,
    id: 'settingsContextMenu',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    localiserId: 'iconsBtn',
                    text: 'Icônes',
                    menu: {
                        xtype: 'menu',
                        frame: true,
                        showSeparator: false,
                        items: [
                            {
                                xtype: 'menuitem',
                                localiserId: 'showAllIconsBtn',
                                id: 'itemShowAllIcons',
                                text: 'Afficher'
                            },
                            {
                                xtype: 'menuitem',
                                localiserId: 'hideAllIconsBtn',
                                id: 'itemHideAllIcons',
                                text: 'Cacher'
                            },
                            {
                                xtype: 'menuitem',
                                localiserId: 'rearangeAllIconsBtn',
                                id: 'itemRearangeAllIcons',
                                text: 'Réorganiser automatiquement'
                            }
                        ]
                    }
                },
                {
                    xtype: 'menuseparator'
                },
                {
                    xtype: 'menuitem',
                    localiserId: 'CustomizeBtn',
                    id: 'itemCustomizeDesktop',
                    iconCls: 'personalize',
                    text: 'Personnaliser'
                }
            ]
        });

        me.callParent(arguments);
    }

});