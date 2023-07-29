(function(API, Utils, VFS, _StandardDialog) {
  'use strict';

  /**
   * File Information Dialog
   *
   * @param   OSjs.VFS.File   file    The requested File
   * @param   Function        onClose Callback on close => fn(button)
   *
   * @api OSjs.Dialogs.FileInformation
   * @see OSjs.Dialogs._StandardDialog
   *
   * @extends _StandardDialog
   * @class
   */
  var FileInformationDialog = function(file, onClose) {
    this.path = file ? file.path : null;
    this.file = file;
    onClose = onClose || function() {};
    _StandardDialog.apply(this, ['FileInformationDialog', {
      title: API._('DIALOG_FILEINFO_TITLE'),
      buttons: [
        {name: 'ok', label: API._('DIALOG_CLOSE')}
      ]
    }, {width:300, height:370}, onClose]);
  };
  FileInformationDialog.prototype = Object.create(_StandardDialog.prototype);

  FileInformationDialog.prototype.init = function() {
    var self = this;
    var root = _StandardDialog.prototype.init.apply(this, arguments);

    var desc = API._('DIALOG_FILEINFO_LOADING', this.path);
    var txt = this._addGUIElement(new OSjs.GUI.Textarea('FileInformationTextarea', {disabled: true, value: desc}), this.$element);

    function _onError(err) {
      var fname = Utils.filename(self.path);
      self._error(API._('DIALOG_FILEINFO_ERROR'), API._('DIALOG_FILEINFO_ERROR_LOOKUP', fname), err);
      txt.setValue(API._('DIALOG_FILEINFO_ERROR_LOOKUP_FMT', self.path));
    }

    function _onSuccess(data) {
      var info = [];
      Object.keys(data).forEach(function(i) {
        if ( i === 'exif' ) {
          info.push(i + ':\n\n' + data[i]);
        } else {
          info.push(i + ':\n\t' + data[i]);
        }
      });
      txt.setValue(info.join('\n\n'));
    }

    VFS.fileinfo(this.file, function(error, result) {
      if ( error ) {
        _onError(error);
        return;
      }
      _onSuccess(result || {});
    });

    return root;
  };

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.Dialogs.FileInfo           = FileInformationDialog;

})(OSjs.API, OSjs.Utils, OSjs.VFS, OSjs.Dialogs._StandardDialog);
