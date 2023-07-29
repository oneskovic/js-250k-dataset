/**
 * The mixin contains all functionality to provide common properties for
 * text fields.
 *
 * @require(qx.event.handler.Input)
 */
qx.Mixin.define("qx.ui.mobile.form.MText",
{

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {var?null} The value of the widget.
   */
  construct : function(value)
  {
    this.initMaxLength();
    this.initPlaceholder();
    this.initReadOnly();
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
   /**
     * Maximal number of characters that can be entered in the input field.
     */
    maxLength :
    {
      check : "PositiveInteger",
      nullable : true,
      init : null,
      apply : "_applyMaxLength"
    },


    /**
     * String value which will be shown as a hint if the field is all of:
     * unset, unfocused and enabled. Set to <code>null</code> to not show a placeholder
     * text.
     */
    placeholder :
    {
      check : "String",
      nullable : true,
      init : null,
      apply : "_applyPlaceholder"
    },


    /** Whether the field is read only */
    readOnly :
    {
      check : "Boolean",
      nullable : true,
      init : null,
      apply : "_applyAttribute"
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
    _applyMaxLength : function(value, old)
    {
      this._setAttribute("maxlength", value);
    },


    // property apply
    _applyPlaceholder : function(value, old)
    {
      // Android is not able to indent placeholder.
      // Adding a space before the placeholder text, as a fix.
      if (qx.core.Environment.get("os.name") == "android" && value !== null) {
        value = " " + value;
      }
      this._setAttribute("placeholder", value);
    },


    /**
     * Points the focus of the form to this widget.
     */
    focus : function() {
      if(this.isReadOnly() || this.getEnabled() == false) {
        return;
      }

      var targetElement = this.getContainerElement();
      if(targetElement) {
        qx.bom.Element.focus(targetElement);
      }
    },


    /**
     * Removes the focus from this widget.
     */
    blur : function() {
      var targetElement = this.getContainerElement();
      if(targetElement) {
        qx.bom.Element.blur(targetElement);
      }
    }
  }
});
