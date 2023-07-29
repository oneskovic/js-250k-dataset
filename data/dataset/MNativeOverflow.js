/**
 * This mixin is included by all widgets which supports native overflowing.
 */
qx.Mixin.define("qx.ui.core.MNativeOverflow",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Whether the widget should have horizontal scrollbars.
     */
    overflowX :
    {
      check : ["hidden", "visible", "scroll", "auto"],
      nullable : true,
      apply : "_applyOverflowX"
    },

    /**
     * Whether the widget should have vertical scrollbars.
     */
    overflowY :
    {
      check : ["hidden", "visible", "scroll", "auto"],
      nullable : true,
      apply : "_applyOverflowY"
    },

    /**
     * Overflow group property
     */
    overflow : {
      group : [ "overflowX", "overflowY" ]
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // property apply
    _applyOverflowX : function(value) {
      this.getContentElement().setStyle("overflowX", value);
    },


    // property apply
    _applyOverflowY : function(value) {
      this.getContentElement().setStyle("overflowY", value);
    }
  }
});