/**
 * This is the preferences menu button
 */
Ext.define('LIME.view.maintoolbar.PreferencesMenuButton', {
    extend : 'Ext.Button',

    alias : 'widget.preferencesMenuButton',

    requires : ['LIME.view.maintoolbar.LanguageSelectionMenu', 'LIME.view.maintoolbar.LocaleSelector'],

    menu : {
        xtype : 'menu',
        plain : true,

        items : [{
            xtype : 'languageSelectionMenu'
        }/*, 
        {
            xtype : 'localeSelector'
        }*/]
    },
    
    initComponent: function(){
        this.text = Locale.strings.preferencesMenuButton;
        this.callParent(arguments);
    }
});
