/**
 * The tree file is a leaf tree item. It cannot contain any nested tree items.
 */
qx.Class.define("qx.ui.tree.TreeFile",
{
  extend : qx.ui.tree.core.AbstractTreeItem,


  properties :
  {
    appearance :
    {
      refine : true,
      init : "tree-file"
    }
  },


  members :
  {
    // overridden
    _addWidgets : function()
    {
      this.addSpacer();
      this.addIcon();
      this.addLabel();
    }
  }
});
