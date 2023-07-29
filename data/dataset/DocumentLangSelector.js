/**
 * This view is used by different elements for nationality selection.
 */
Ext.define('LIME.view.DocumentLangSelector', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.docLangSelector',
	name : 'docLang',
    valueField : 'code',
    displayField : 'name',
    queryMode: 'local',
    typeAhead: true,
    store : 'DocumentLanguages',
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
    allowBlank : false,
    
    initComponent: function(){
        this.emptyText = Locale.strings.language;
        this.callParent(arguments);
    }
}); 
