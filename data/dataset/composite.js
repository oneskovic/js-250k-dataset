/**
 * The Composite is a generic container widget.
 *
 * It exposes all methods to set layouts and to manage child widgets
 * as public methods. You must configure this widget with a layout manager to
 * define the way the widget's children are positioned.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   // create the composite
 *   var composite = new qx.ui.mobile.container.Composite();
 *
 *   composite.setLayout(new qx.ui.mobile.layout.HBox());
 *
 *   // add some children
 *   composite.add(new qx.ui.mobile.basic.Label("Name: "), {flex:1});
 *   composite.add(new qx.ui.mobile.form.TextField());
 *
 *   this.getRoot().add(composite);
 * </pre>
 *
 * This example horizontally groups a label and text field by using a
 * Composite configured with a horizontal box layout as a container.
 */
qx.Class.define("qx.ui.mobile.container.Composite",
{
  extend : qx.ui.mobile.core.Widget,
  include : [ qx.ui.mobile.core.MChildrenHandling, qx.ui.mobile.core.MLayoutHandling],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param layout {qx.ui.mobile.layout.Abstract?null} The layout that should be used for this
   *     container
   */
  construct : function(layout)
  {
    this.base(arguments);
    if (layout) {
      this.setLayout(layout);
    }
  },




  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics, members)
  {
    qx.ui.mobile.core.MChildrenHandling.remap(members);
    qx.ui.mobile.core.MLayoutHandling.remap(members);
  }
});
