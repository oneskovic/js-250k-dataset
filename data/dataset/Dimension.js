/**
 * @tag noPlayground
 */
qx.Class.define("demobrowser.demo.bom.Dimension",
{
  extend : qx.application.Native,

  members :
  {
    main : function()
    {
      this.base(arguments);

      for (var i=1; i<1000; i++)
      {
        var el = document.getElementById("block" + i);
        if (!el) {
          break;
        }

        var msg = "Block " + i + ": Box=" + boxSize(el) + "; Content=" + contentSize(el);
        this.debug(msg);
      }

      function boxSize(el)
      {
        var Dimension = qx.bom.element.Dimension;
        return Dimension.getWidth(el) + "x" + Dimension.getHeight(el);
      }

      function contentSize(el)
      {
        var Dimension = qx.bom.element.Dimension;
        return Dimension.getContentWidth(el) + "x" + Dimension.getContentHeight(el);
      }
    }
  }
});
