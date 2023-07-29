requireCss("./adErrors/adErrors.css");

var fun   = require("../../uki-core/function"),
    utils = require("../../uki-core/utils"),
    dom   = require("../../uki-core/dom"),
    view  = require("../../uki-core/view"),
    build = require("../../uki-core/builder").build,

    Container = require("../../uki-core/view/container").Container;


var AdErrors = view.newClass('ads.AdErrors', Container, {

    model: fun.newProp('model', function(v) {
        if (this._model) {
            this._model.removeListener('change.errors',
                fun.bindOnce(this._changeErrors, this));
        }
        this._model = v;
        if (this._model) {
            this._model.addListener('change.errors',
                fun.bindOnce(this._changeErrors, this));
            this._changeErrors();
        }
    }),

    _createDom: function(initArgs) {
        this._dom = dom.createElement('div', { className: 'adErrors'});
        this._text = build({ view: 'Text', addClass: 'adErrors-text phs pvs' })
          .appendTo(this)[0];
    },

    _changeErrors: function() {
        var errors = [];
        utils.forEach(this.model().errors() || {}, function(message, key) {
            if (message && key !== 'count') {
                errors.push(
                    '<span class="adErrors-error">' +
                        (errors.length + 1) + '. ' + message + '.' +
                    '</span>'
                );
            }
        });
        var word = errors.length > 1 ? 'Errors' : 'Error';
        this._text.html('<strong class="adErrors-title">' +
            errors.length + ' ' + word + ':</strong>' +
            errors.join(' '));

        if (this._lastErrorCount !== errors.length) {
            this._lastErrorCount = errors.length;
            this.visible(!!errors.length).trigger({ type: 'resized' });
        }
    }
});


exports.AdErrors = AdErrors;

