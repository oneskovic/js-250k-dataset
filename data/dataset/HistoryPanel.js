kimios.properties.HistoryPanel = Ext.extend(Ext.Panel, {
  
  constructor : function(config){
    this.dmEntityPojo = config.dmEntityPojo;
      this.title = kimios.lang('DocHistory');
      this.iconCls = 'reporting';
      this.layout = 'border';
      this.border = false;
      this.buttonAlign = 'left';
      this.bodyStyle = 'background-color:transparent;';
      this.loadingRequired = false;
      this.loaded = false;
      
      this.grid = new Ext.grid.GridPanel({
        region : 'center',
        border : true,
        stripeRows : true,
        margins : '5 5 5 5',
      viewConfig : {forceFit : true,scrollOffset : 0},
        store : new DmsJsonStore( {
        fields : kimios.record.historyRecord,
        url : 'Log',
        root : 'logs',
        baseParams : {
          action : 'getDocumentLogs',
          documentUid : this.dmEntityPojo.uid
        },
              sortInfo: {
                  field: 'date',
                  direction: 'DESC'
              }
      }),
        cm : this.getColumns()        
      });
      
      this.refreshButton = new Ext.Button({
        iconCls : 'refresh',
        tooltip : kimios.lang('Refresh'),
        scope : this,
        handler : function(){
          this.grid.store.reload();
        }
      });
      
      this.fbar = ['->', this.refreshButton];
      this.items = [this.grid];
    kimios.properties.HistoryPanel.superclass.constructor.call(this, config);
  },
  
  setPojo : function(pojo){
    this.dmEntityPojo = pojo;
    this.loaded = false;
  },

  initComponent: function(){
    kimios.properties.HistoryPanel.superclass.initComponent.apply(this, arguments);
    
    this.on('activate', function(){
      this.doLayout();
      if (this.loaded == false){
        this.grid.store.load();
      }
    }, this);
    
    this.grid.store.on('beforeload', function(store, options){
      this.setIconClass('loading');
    }, this);
    
    this.grid.store.on('load', function(store, records, options){
      this.loaded = true;
      this.setIconClass('reporting');
    }, this);
    
    this.grid.on('rowcontextmenu', function(grid, rowIndex, e) {
      e.preventDefault();
    }, this);
    
    this.grid.on('containercontextmenu', function(grid, e){
      e.preventDefault();
    }, this);
  },
  
  getColumns : function(){
    return new Ext.grid.ColumnModel([{
      align : 'center',
      readOnly : true,
      width : 20,
      hidden : false,
      sortable : false,
      hideable : false,
      fixed: true,
      resizable : false,
      menuDisabled : true,
      renderer : function(val, metaData, record, rowIndex, colIndex, store) {
        metaData.css = 'reporting';
      }
    }, {
      header : kimios.lang('Date'),
      dataIndex : 'date',
      width : 120,
      fixed : true,
      readOnly : true,
      sortable : true,
      resizable : false,
      menuDisabled : true,
      renderer : function(value){
        return kimios.date(value);
      }
    },{
      header : kimios.lang('Author'),
      dataIndex : 'user',
      width : 25,
      readOnly : true,
      sortable : true,
      menuDisabled : true,
      renderer : function(val, metaData, record, rowIndex, colIndex, store) {
        return val+ '@'+ record.get('userSource');
      }
    },{
      header : kimios.lang('Operation'),
      dataIndex : 'operation',
      readOnly : true,
      sortable : true,
      menuDisabled : true,
      renderer : function(val, metaData, record, rowIndex, colIndex, store) {
        return kimios.lang('Operation'+val);
      }
    }]);
  }

});
