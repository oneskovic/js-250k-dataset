/**
 * Keyhandler test converted to use the low level event API.
 *
 * @tag noPlayground
 * @tag showcase
 */
qx.Class.define("demobrowser.demo.event.KeyEvent",
{
  extend : demobrowser.demo.event.EventDemo,

  members :
  {
    main : function()
    {
      this.base(arguments);

      this._initLogger(
        ["Event", "Key identifier", "Char code", "Shift", "Ctrl", "Alt"],
        document.getElementById("logger"),
        50
      );

      var events = ["keydown", "keypress", "keyup", "keyinput"];
      for (var i=0; i<events.length; i++)
      {
        qx.bom.Element.addListener(
          document.documentElement,
          events[i],
          this.logKeyEvent,
          this
        )
      }
    },


    logKeyEvent: function(keyEvent)
    {
      var type = keyEvent.getType();
      this._log([
        type,
        type !== "keyinput" ? keyEvent.getKeyIdentifier() : "",
        type == "keyinput" ? keyEvent.getCharCode() : "",
        keyEvent.isShiftPressed(),
        keyEvent.isCtrlPressed(),
        keyEvent.isAltPressed()
      ]);
      keyEvent.preventDefault();
    }
  }
});
