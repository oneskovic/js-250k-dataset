var utils = require('ripple/utils'),
    bus = require('ripple/bus');

function _initializeEulaCheck() {
    var width = jQuery(document).width(),
        p = (width / 2) - 277;


    $(".eula-window").show();
    $(".eula-dialog").show().css({left: p + "px"});

    $("#eula-accept").click(function () {
        bus.send("acceptEula", null, function (result) {
            $(".eula-window").hide();
            $(".eula-dialog").hide();
        });
    });

    $("#eula-decline").click(function () {
        bus.send("disable", null, null);
    });
}

module.exports = {
    initialize: function () {
        //HACK: there has to be a better way!!!
        if ($("#extension-url").val().match(/geelfhphabnejjhdalkjhgipohgpdnoc/)) {
            // do nothing, extension was installed from the Chrome Store
            return;
        }

        bus.send("checkEula", null, function (response) {
            console.log("eula response: ", response);
            if (response === false) {
                _initializeEulaCheck();
            }
        });
    }
};
