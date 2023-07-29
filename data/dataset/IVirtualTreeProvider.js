/**
 * This interface needs to implemented from all {@link qx.ui.tree.VirtualTree}
 * providers.
 *
 * @internal
 */
qx.Interface.define("qx.ui.tree.provider.IVirtualTreeProvider",
{
  members :
  {
    /**
     * Creates a layer for node and leaf rendering.
     *
     * @return {qx.ui.virtual.layer.Abstract} new layer.
     */
    createLayer : function() {},


    /**
     * Creates a renderer for rendering.
     *
     * @return {var} new node renderer.
     */
    createRenderer : function() {},


    /**
     * Sets the name of the property, where the children are stored in the model.
     *
     * @param value {String} The child property name.
     */
    setChildProperty : function(value)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertString(value);
    },


    /**
     * Sets the name of the property, where the value for the tree folders label
     * is stored in the model classes.
     *
     * @param value {String} The label path.
     */
    setLabelPath : function(value)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertString(value);
    },


    /**
     * Styles a selected item.
     *
     * @param row {Integer} row to style.
     */
    styleSelectabled : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    },


    /**
     * Styles a not selected item.
     *
     * @param row {Integer} row to style.
     */
    styleUnselectabled : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    },


    /**
     * Returns if the passed row can be selected or not.
     *
     * @param row {Integer} row to select.
     * @return {Boolean} <code>true</code> when the row can be selected,
     *    <code>false</code> otherwise.
     */
    isSelectable : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    }
  }
});