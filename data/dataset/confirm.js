(function(API, Utils, _StandardDialog) {
  'use strict';

  /**
   * Confirmation Dialog
   *
   * @param   String          msg     Confirm message
   * @param   Function        onClose Callback on close => fn(button)
   * @param   Object          args    List of arguments (Will be passed on to _StandardDialog)
   *
   * @api OSjs.Dialogs.Confirm
   * @see OSjs.Dialogs._StandardDialog
   *
   * @extends _StandardDialog
   * @class
   */
  var ConfirmDialog = function(msg, onClose, args) {
    args = Utils.mergeObject({
      title: API._('DIALOG_CONFIRM_TITLE'),
      icon: 'status/dialog-question.png',
      message: msg,
      buttons: ['cancel', 'ok']
    }, (args || {}));
    _StandardDialog.apply(this, ['ConfirmDialog', args, {width:350, height:120}, onClose]);
  };
  ConfirmDialog.prototype = Object.create(_StandardDialog.prototype);

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.Dialogs.Confirm            = ConfirmDialog;

})(OSjs.API, OSjs.Utils, OSjs.Dialogs._StandardDialog);
