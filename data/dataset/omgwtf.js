var event = require('ripple/event'),
    db = require('ripple/db'),
    _loaded = false,
    _self;

function _delay(action) {
    window.setTimeout(function () {
        if (!_loaded) {
            if (jQuery(".first-run-window").is(":visible")) {
                _delay(action);
            } else {
                action();
            }
        }
    }, 10000);
}

function _hide() {
    jQuery(".error-window").css({display: 'none'});
    jQuery(".error-dialog").css({display: 'none'});
}

function _show() {
    jQuery(".error-window").css({display: 'block'});

    jQuery(".error-dialog").css({
        display: 'block',
        left: (jQuery(document).width() / 2) - 277 + "px"
    });

    jQuery("#error-wait").click(function () {
        _hide();
        _delay(_show);
    });

    jQuery("#error-panic").click(function () {
        db.removeAll(null, function () {
            window.tinyHipposReload = true;
            localStorage.clear();
            location.reload();
        });
    });
}

_delay(_show);

_self = {
    initialize: function (previous, baton) {
        event.on("TinyHipposLoaded", function () {
            _loaded = true;
        });
    },
    show: _show,
    hide: _hide
};

module.exports = _self;
