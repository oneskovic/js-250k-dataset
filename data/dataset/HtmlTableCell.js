qx.Class.define("qx.test.ui.virtual.performance.HtmlTableCell",
{
  extend : qx.test.ui.virtual.performance.AbstractLayerTest,
  type : "abstract", // disabled

  members :
  {
    getLayer : function() {
      return new qx.test.ui.virtual.performance.layer.HtmlTableCell(this);
    },


    getCellHtml : function(row, column, left, top, width, height)
    {
      var html = [
        "<td ",
        "style='",
        "border-collapse: collapse;",
        "margin: 0px;",
        "padding: 0px;",
        "'>",
        row,
        " / ",
        column,
        "</td>"
      ];
      return html.join("");
    }

  }

});
