var view  = require("../../uki-core/view"),
    build = require("../../uki-core/builder").build,
    fun   = require("../../uki-core/function"),

    Dialog = require("../../uki-fb/view/dialog").Dialog;

var RefreshDialog = view.newClass('ads.RefreshDialog', Dialog,
  require("../lib/loggingState").getMixinForDialog('Refresh Dialog'), {

  _createDom: function(initArgs) {
    Dialog.prototype._createDom.call(this, initArgs);
    // set explicitly, this dialog should not be dismiss-able at all!
    this.closeOnEsc(false);
    this._collection = build([
      { view: 'DialogHeader', text: tx('cs:require-login-title') },
      { view: 'DialogContent', childViews: [
        { view: 'DialogBody', childViews: [
          { view: 'Text', as: 'dbody',
            text: tx('ads:pe:dialog-logged-out') }
        ] },
        { view: 'DialogFooter', childViews: [
          { view: 'Button', label: 'Refresh', large: true,
            as: 'refresh', use: 'confirm',
            on: { click: this._onrefresh }
          }
        ] }
      ] }
    ]).appendTo(this);
  },

  _onrefresh: function(e) {
    e.stopPropagation && e.stopPropagation();
    // reloading the page, AAAAH!
    window.location.reload(true);
  }

});

exports.RefreshDialog = RefreshDialog;
