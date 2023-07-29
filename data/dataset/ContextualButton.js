/**
 * A contextual button
 */
Ext.define('LIME.view.modal.newSavefile.toolbar.ContextualButton', {
    extend : 'Ext.Button',
    alias : 'widget.newSavefileToolbarContextualButton',
    fullText : new Ext.Template("{operation} {what}"),
    fileIcon : 'resources/images/icons/page_white_add.png',
    folderIcon : 'resources/images/icons/folder_add.png',
    
    initComponent: function(){
        this.text = Locale.strings.newLabel;
        this.callParent(arguments);
    }
});
