requireCss("./logDialog/loadDialog.css");

var fun   = require("../../uki-core/function"),
    view  = require("../../uki-core/view"),
    build = require("../../uki-core/builder").build,

    Dialog = require("../../uki-fb/view/dialog").Dialog;

var LogDialog = view.newClass('ads.LogDialog', Dialog,
  require("../lib/loggingState").getMixinForDialog('log_dialog'), {

  header: function() {
    return this._collection.view('header');
  },

  closeButton: function() {
    return this._collection.view('closeButton');
  },

  title: fun.newDelegateProp('header', 'html'),

  log: function(message, className) {
    return build({ view: 'Text', text: message, addClass: className })
      .appendTo(this._collection.view('log'));
  },

  append: function(view) {
    return build(view).appendTo(this._collection.view('log'))[0];
  },

  clear: function(message, className) {
    this._collection.view('log').html('');
    return this;
  },

  _createDom: function(initArgs) {
    Dialog.prototype._createDom.call(this, initArgs);

    this
      .modal(true)
      .addClass('logDialog');

    this._collection = build([
      { view: 'DialogHeader', html: "Log", as: 'header' },
      { view: 'DialogContent', childViews: [
        { view: 'DialogBody', as: 'log', addClass: 'logDialog-log' },
        { view: 'DialogFooter', childViews: [
          { view: 'Button', label: 'Close', large: true, as: 'closeButton' }
        ] }
      ] }
    ]).appendTo(this);

    this.closeButton().on('click', fun.bind(function() {
      this.visible(false);
    }, this));
  }
});


exports.LogDialog = LogDialog;
