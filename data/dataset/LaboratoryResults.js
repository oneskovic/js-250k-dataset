Ext.define('App.view.patient.LaboratoryResults', {
	extend           : 'Ext.view.View',
    alias            : 'widget.lalboratoryresultsdataview',
	trackOver        : true,
    cls              : 'vitals',
    itemSelector     : 'table.vitals-column',
    overItemCls      : 'vitals-column-over',
    selectedItemCls  : 'vitals-column-selected',
    loadMask         : true,
    singleSelect     : true,
	emptyText        : '<div style="color: #cbcbcb; font-size: 40px; text-align:center">' + _('no_laboratory_results_to_display') + '</div>',
	initComponent: function() {
		var me = this;
        me.tpl = '<table>' +
	        '   <tbody>' +
            '       <tr>' +
            '       <tpl for=".">' +
            '           <td>' +
            '               <table class="x-grid-table x-grid-table-vitals vitals-column {[ (values.auth_uid == null || values.auth_uid == 0 ) ? "vitals-column-caution" : ""]}">' +
	        '                   <tbody>' +
            '                       <tr class="grid-row">' +
	        '                           <td class="grid-cell" style="border:none; padding:0">' +
	        '                               <div class="x-grid-cell-inner x-panel-header x-panel-header-default" style="border:none; font-weight:bold; padding: 5px 10px; margin-bottom:5px">{[Ext.Date.format(values.date, "Y-m-d")]}</div>' +
	        '                           </td>' +
	        '                       </tr>' +
            '                       <tpl for="columns">' +
            '                           <tr class="x-grid-row">' +
	        '                               <td class="x-grid-cell">' +
	        '                                   <div class="x-grid-cell-inner ">{observation_value} {unit}</div>' +
	        '                               </td>' +
	        '                           </tr>' +
            '                       </tpl>' +
            '                   </tbody>' +
	        '               </table>' +
	        '           </td>' +
            '       </tpl>' +
            '       </tr>' +
	        '   </tbody>' +
            '</table>';

		me.callParent(arguments);
	}

});
