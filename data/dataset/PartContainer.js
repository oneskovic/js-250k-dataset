/**
 * The container used by {@link Part} to insert the buttons.
 *
 * @internal
 */
qx.Class.define("qx.ui.toolbar.PartContainer",
{
  extend : qx.ui.container.Composite,


  construct : function()
  {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox);
  },


  events : {
    /** Fired if a child has been added or removed */
    changeChildren : "qx.event.type.Event"
  },

  properties :
  {
    appearance :
    {
      refine : true,
      init : "toolbar/part/container"
    },

    /** Whether icons, labels, both or none should be shown. */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      inheritable : true,
      event : "changeShow"
    }
  },


  members : {
    // overridden
    _afterAddChild : function(child) {
      this.fireEvent("changeChildren");
    },


    // overridden
    _afterRemoveChild : function(child) {
      this.fireEvent("changeChildren");
    }
  }
});
