qx.Class.define("qx.test.ui.form.AbstractVirtualBox",
{
  extend : qx.test.ui.LayoutTestCase,

  members :
  {
    setUp : function()
    {
      this.__selectBox = new qx.ui.form.VirtualSelectBox;
      this.getRoot().add(this.__selectBox);

      this.__comboBox = new qx.ui.form.VirtualComboBox;
      this.getRoot().add(this.__comboBox);

      this.flush();
    },

    tearDown : function()
    {
      this.base(arguments);
      this.__selectBox.dispose();
      this.__selectBox = null;

      this.__comboBox.dispose();
      this.__comboBox = null;
    },

    testStatePopupOpen : function()
    {
      this.__selectBox.open();
      this.flush();
      this.assertTrue(this.__selectBox.hasState("popupOpen"));

      this.__selectBox.close();
      this.flush();
      this.assertFalse(this.__selectBox.hasState("popupOpen"));

      this.__comboBox.open();
      this.flush();
      this.assertTrue(this.__comboBox.hasState("popupOpen"));

      this.__comboBox.close();
      this.flush();
      this.assertFalse(this.__comboBox.hasState("popupOpen"));
    }
  }
});