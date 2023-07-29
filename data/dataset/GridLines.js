qx.Class.define("qx.test.ui.virtual.layer.GridLines",
{
  extend : qx.test.ui.LayoutTestCase,

  members :
  {
    _assertGridLines : function(linesLayer, isHorizontal, color, lineSize, msg)
    {
      this.assertEquals(isHorizontal, linesLayer.isHorizontal(), msg);
      this.assertEquals(color, linesLayer.getDefaultLineColor(), msg);
      this.assertEquals(lineSize, linesLayer.getDefaultLineSize(), msg);
    },

    testCreate : function()
    {
      var lines = new qx.ui.virtual.layer.GridLines();
      this._assertGridLines(lines, true, "gray", 1);
      lines.destroy();

      var lines = new qx.ui.virtual.layer.GridLines("horizontal");
      this._assertGridLines(lines, true, "gray", 1);
      lines.destroy();

      var lines = new qx.ui.virtual.layer.GridLines("vertical", "red");
      this._assertGridLines(lines, false, "red", 1);
      lines.destroy();

      var lines = new qx.ui.virtual.layer.GridLines("vertical", "red", 5);
      this._assertGridLines(lines, false, "red", 5);
      lines.destroy();
    }
  }
});
