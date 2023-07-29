// define namespace
if(!Repository) var Repository = {};
if(!Repository.Plugins) Repository.Plugins = {};

/**
 * Supplies filtering by model type (stencil set)
 * Note: Only stencil sets defined in the stencilsets.json can be selected as filter
 */

Repository.Plugins.TypeFilter = {
	
	filter : [],
	
	construct: function(facade) {
		this.name = Repository.I18N.TypeFilter.name;
		arguments.callee.$.construct.apply(this, arguments); // call Plugin super class

		var types =[];
		
		// load types
		this.facade.modelCache.getModelTypes().each(function(stencilset) {
			types.push( [ stencilset.namespace , stencilset.title] )
		}.bind(this));
		
		
		// prepare data for dataView
		var store 	= new Ext.data.SimpleStore({
	        fields	: ['namespace', 'title'],
	        data	: types
	    });
		
		var tpl 	= new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="x-grid3-row" UNSELECTABLE = "on" style="clear:left;">',
					'<div class="x-grid3-row-checker" style="width: 18px; float:left;"></div>',
					'<div class="x-grid3-cell-inner x-grid3-col-1">{title}</div>',
				'</div>',
			'</tpl>'
		);
		
	    var grid = new Ext.DataView({
	        store			: store,
			tpl 			: tpl,
	       	autoHight		: true,
			itemSelector	: 'div.x-grid3-row',
    		overClass		: 'x-grid3-row-over',
			selectedClass	: 'x-grid3-row x-grid3-row-selected',
			multiSelect		: true,
			simpleSelect 	: true
	    });

		
		this.panel.add( grid )
		this.panel.doLayout();
		
		grid.addListener('selectionchange', this._onSelectionChange.bind(this) );
	},
	/**
	 * apply typ filter, if selection has changed 
	 * @param {Object} dataView
	 * @param {Object} selection
	 */
	_onSelectionChange : function( dataView, selection ) {
		
		var filter = $A(dataView.getSelectedRecords()).map(function(item){ return item.data.namespace });
		this.facade.applyFilter('type', filter.join(","));
		
	}
};

Repository.Plugins.TypeFilter = Repository.Core.ContextFreePlugin.extend(Repository.Plugins.TypeFilter);
