qx.Class.define("qx.test.ui.table.celleditor.ComboBox",
{
  extend : qx.test.ui.table.celleditor.AbstractField,

  members :
  {
    setUp : function() {
      this.factory = new qx.ui.table.celleditor.ComboBox();
    },


    tearDown : function()
    {
      this.base(arguments);
      this.factory.dispose();
    },


    _getCellInfo : function(value) {
      return {
        value: value,
        col: 0,
        table: {
          getTableColumnModel: function() {
            return {
              getDataCellRenderer: function(col) {
                return {
                  _getContentHtml : function(cellInfo) {
                    return cellInfo.value
                  }
                }
              }
            }
          }
        }
      }
    },


    testChangeEditorSelection : function()
    {
      this.factory.setListData(["elefant", "affe", "banane"]);
      var editor = this.factory.createCellEditor(this._getCellInfo("affe"));

      var list = editor.getChildControl("list");
      this.assertEquals("affe", list.getSelection()[0].getLabel());
      list.setSelection([list.getChildren()[2]]);

      this.assertEquals("banane", this.factory.getCellEditorValue(editor));

      editor.destroy();
    }
  }
});
