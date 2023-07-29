/**
 * This menu is a container for all the buttons we will use to mark.
 * Each button is a TreeButton (our "panelish" implementation of a tree made of buttons)
 */
Ext.define('LIME.view.MarkingMenu', {
    extend : 'Ext.tab.Panel',

    requires : ['LIME.view.NationalitySelector'],

    alias : 'widget.markingMenu',

    collapsible : true,

    layout : 'fit',

    listeners : {
        resize : function(cmp) {
            cmp.doLayout();
        }
    },

    constructor : function() {
        /**
         * @property {Array} shown
         * Array containing references to the currently opened buttons
         */
        this.shown = [];
        this.title = Locale.strings.eastToolbarTitle;
        this.items = [{
            xtype : 'treepanel',
            title : Locale.strings.documentStructure,
            cls : 'x-tree-noicon x-tree-custom structure',
            id: 'treeStructure',
            useArrows: true,
            border : false,
            rootVisible: false,
            autoScroll : true
        },{
            xtype : 'treepanel',
            title : Locale.strings.commonButtons,
            cls : 'x-tree-noicon x-tree-custom commons',
            id: 'treeCommons',
            useArrows: true,
            border : false,
            rootVisible: false,
            autoScroll : true
        }],
        this.callParent(arguments);
    }
});
