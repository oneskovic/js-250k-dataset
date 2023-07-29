/**
 * This view is used by different elements for nationality selection.
 */
Ext.define('LIME.view.LocaleSelector', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.docLocaleSelector',
	name : 'docLocale',
    emptyText : 'Locale', //TODO: localize
    valueField : 'name',
    displayField : 'name',
    queryMode: 'local',
    store : 'Locales',
    hideAction: function(cmp) {
        cmp.getStore().clearFilter();
    },
    listeners: {
        beforehide: function(cmp){
            cmp.hideAction(cmp);
        },
        beforedestroy: function(cmp){
            cmp.hideAction(cmp);
        }
    },
    allowBlank : false
}); 
