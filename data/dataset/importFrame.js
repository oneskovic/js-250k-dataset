'use strict';

var mvelo = mvelo || {};

mvelo.ImportFrame = function(prefs) {
  mvelo.ExtractFrame.call(this, prefs);
  this._ctrlName = 'imFrame-' + this.id;
  this._typeRegex = /-----BEGIN PGP PUBLIC KEY BLOCK-----[\s\S]+?-----END PGP PUBLIC KEY BLOCK-----/;
};

mvelo.ImportFrame.prototype = Object.create(mvelo.ExtractFrame.prototype);
mvelo.ImportFrame.prototype.parent = mvelo.ExtractFrame.prototype;

mvelo.ImportFrame.prototype._renderFrame = function() {
  this.parent._renderFrame.call(this);
  this._eFrame.addClass('m-import');
};

mvelo.ImportFrame.prototype._clickHandler = function() {
  var that = this;
  this.parent._clickHandler.call(this, function() {
    that._port.postMessage({
      event: 'imframe-armored-key',
      data: that._getArmoredMessage(),
      sender: that._ctrlName
    });
  });
  return false;
};

mvelo.ImportFrame.prototype._registerEventListener = function() {
  this.parent._registerEventListener.call(this);
  var that = this;
  this._port.onMessage.addListener(function(msg) {
    switch (msg.event) {
      case 'import-result':
        if (msg.resultType.error) {
          that._eFrame.addClass('m-error');
        } else if (msg.resultType.warning) {
          that._eFrame.addClass('m-warning');
        } else if (msg.resultType.success) {
          that._eFrame.addClass('m-ok');
        }
        break;
    }
  });
};
