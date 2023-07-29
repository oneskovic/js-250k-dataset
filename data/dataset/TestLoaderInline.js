qx.Class.define("testrunner.TestLoaderInline",
{
  extend : qx.dev.unit.TestLoaderInline,

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getInstance : function() {
      return this.instance;
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @return {void}
     */
    main : function()
    {
      testrunner.TestLoader.instance = this;
      this.base(arguments);
    }
  }
});
