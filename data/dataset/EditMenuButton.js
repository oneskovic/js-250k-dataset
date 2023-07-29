/**
 * This is the Document menu button
 */
Ext.define('LIME.view.maintoolbar.EditMenuButton', {
    extend : 'Ext.Button',

    alias : 'widget.editMenuButton',

    menu : {
        xtype : 'menu',
        plain : true
    },
    
    initComponent: function(){
        this.text = Locale.strings.editMenuButton;
        this.callParent(arguments);
    }
});
