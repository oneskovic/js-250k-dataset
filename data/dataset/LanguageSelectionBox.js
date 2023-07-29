/**
 * This is the interface Language Selection Box.
 */
Ext.define('LIME.view.maintoolbar.LanguageSelectionBox', {

	// extends the viewport
	extend : 'Ext.form.field.ComboBox',

	// set the alias
	alias : 'widget.languageSelectionBox',

	// set the store containing the languages
	store : 'Languages',

	// display the name of the language
	displayField : 'language',

	// set the query mode
	queryMode : 'local',

	// hide the label
	hideLabel : true,
    
    initComponent: function(){
        this.emptyText = Locale.strings.languageSelectionBoxEmptyText;
        this.callParent(arguments);
    }

}); 
