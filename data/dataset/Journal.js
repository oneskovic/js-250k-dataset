Ext.define('Ssp.view.tools.journal.Journal',{
	extend: 'Ext.form.Panel',
	alias : 'widget.journal',
    mixins: [ 'Deft.mixin.Injectable',
              'Deft.mixin.Controllable'],
	height: '100%',
	width: '100%',
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll:true,
    initComponent: function(){
		Ext.apply(this,{
	          items: [
	                  {
	                  	xtype: 'journallist', 
	                  	flex: 0.32,
						maintainFlex: true
	                  },
					  {
					  	xtype : 'splitter',
						draggable : true,
						collapsible : true,
						border: 2,
						style:{
							borderColor: 'lightblue',
							borderStyle:'solid'
						}
					  },
					  
					  {
	                  	xtype: 'editjournal', 
	                  	flex: 0.68
	                  }
	                 ]});
    	return this.callParent(arguments);
    }
});