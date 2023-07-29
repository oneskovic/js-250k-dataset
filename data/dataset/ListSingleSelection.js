qx.Class.define("qx.test.ui.selection.ListSingleSelection",
{
  extend : qx.test.ui.selection.AbstractSingleSelectonTest,

  members :
  {
    setUp : function()
    {
      var length = 10;
      this._notInSelection = [];
      this._mode = "single";

      this._widget = new qx.ui.form.List().set(
      {
        selectionMode: this._mode,
        width : 200,
        height : 400
      });
      this.getRoot().add(this._widget);

      for (var i = 0; i < length; i++) {
        var item = new qx.ui.form.ListItem("ListItem" + i);
        this._widget.add(item);

        if (i == 5) {
          this.assertIdentical(0, this._widget.getSelection().length,
            "Couldn't setup test, because selection isn't empty");

          this._widget.setSelection([item]);
          this._selection = [item];
        } else {
          this._notInSelection.push(item);
        }
      }

      this.flush();
    },

    tearDown : function()
    {
      this.base(arguments);
      this._widget.destroy();
      this._widget = null;
      this._selection = null;
      this._notInSelection = null;
      this.flush();
    },

    _getChildren : function()
    {
      if (this._widget != null) {
        return this._widget.getChildren();
      } else {
        return [];
      }
    },

    _createTestElement : function(name) {
      return new qx.ui.form.ListItem(name);
    }
  }
});