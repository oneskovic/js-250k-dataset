qx.Class.define("showcase.page.virtuallist.messenger.GroupModel",
{
  extend : qx.core.Object,


  construct : function(name)
  {
    this.base(arguments);

    if (name !== undefined) {
      this.setName(name);
    }
  },


  properties :
  {
    name :
    {
      init : "Friends",
      event : "changeName",
      check : "String"
    },

    open :
    {
      check : "Boolean",
      init : true,
      event : "changeOpen"
    },

    count :
    {
      check : "Integer",
      init : 0,
      event : "changeCount"
    }
  }
});