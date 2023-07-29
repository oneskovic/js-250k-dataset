/* ************************************************************************
************************************************************************ */
/**
 *
 * @asset(showcase/virtuallist/imicons/*)
 */

qx.Class.define("showcase.page.virtuallist.messenger.Buddy",
{
  extend : qx.ui.core.Widget,


  construct : function()
  {
    this.base(arguments);

    this.set({
      padding : [0, 3]
    });

    this._setLayout(new qx.ui.layout.HBox(3).set({
      alignY : "middle"
    }));

    this._add(this.getChildControl("statusIcon"));
    this._add(this.getChildControl("label"), {flex : 1});
    this._add(this.getChildControl("icon"));
  },


  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "listitem"
    },


    name :
    {
      check : "String",
      apply : "_applyLabel",
      init : ""
    },


    avatar :
    {
      check : "String",
      apply : "_applyAvatar",
      init : ""
    },


    status :
    {
      check : "String",
      apply : "_applyStatus",
      init : ""
    },

    gap :
    {
      themeable: true
    }
  },

  members :
  {
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "label" :
          control = new qx.ui.basic.Label().set({
            allowGrowX : true
          });
          break;
        case "icon" :
          control = new qx.ui.basic.Image().set({
            width : 26,
            height : 26,
            scale : true
          });
          break;
        case "statusIcon" :
          control = new qx.ui.basic.Image();
          break;
      }
      return control || this.base(arguments, id);
    },


    // apply method
    _applyLabel : function(value, old) {
      this.getChildControl("label").setValue(value);
    },


    // apply method
    _applyAvatar : function(value, old) {
      this.getChildControl("icon").setSource(value);
    },


    // apply method
    _applyStatus : function(value, old)
    {
      var source = "showcase/virtuallist/imicons/status_" + value + ".png";
      this.getChildControl("statusIcon").setSource(source);
    }
  }
});
