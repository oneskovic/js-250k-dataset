qx.Class.define("qx.test.ui.virtual.layer.LayerSimple",
{
  extend : qx.ui.virtual.layer.Abstract,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    getCellHtml : function(row, column, left, top, width, height)
    {
      var content = row + " / " + column;
      return [
        "<div style='position:absolute;",
        "left:", left, "px;",
        "top:", top, "px;",
        "width:", width, "px;",
        "height:", height, "px;",
        "'>",
        content,
        "</div>"
      ].join("");
    },

    _fullUpdate : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    )
    {
      var html = [];
      var left = 0;
      var top = 0;
      var row = firstRow;
      var col = firstColumn;
      for (var x=0; x<rowSizes.length; x++)
      {
        var left = 0;
        var col = firstColumn;
        var height = rowSizes[x]
        for(var y=0; y<columnSizes.length; y++)
        {
          var width = columnSizes[y];

          html[html.length] = this.getCellHtml(
            row, col,
            left, top,
            width, height
          );

          col++;
          left += width;
        }
        top += height;
        row++;
      }

      this.getContentElement().setAttribute("html", html.join(""));
    }
  }
});