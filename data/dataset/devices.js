var constants = require('ripple/constants'),
    db = require('ripple/db'),
    resizer = require('ripple/resizer');

function _getTextZooming(zooming) {
    return zooming + '%';
}

module.exports = {
    panel: {
        domId: "devices-container",
        collapsed: true,
        pane: "left",
        titleName: "Orientation and Zooming",
        display: true
    },

    initialize: function () {
        var zooming = document.getElementById(constants.ENCAPSULATOR.ZOOMING);
        function updateZoomingValues() {
            var zoomingText, scaleFactor;

            zoomingText = _getTextZooming(zooming.value);
            jQuery('#screen-zooming-label').html(zoomingText);

            // Zooming device skin
            scaleFactor = zooming.value / 100;
            resizer.scaleDevice(scaleFactor);
        }

        function initializeValues() {
            var zoomingValue =  db.retrieve(constants.ENCAPSULATOR.ZOOMING);

            if (!zoomingValue) {
                zoomingValue = 100;
            }
            jQuery("#" + constants.ENCAPSULATOR.ZOOMING).val(zoomingValue);
            updateZoomingValues();
        }

        jQuery("#" + constants.ENCAPSULATOR.ZOOMING).bind("change", function () {
            updateZoomingValues();
            db.save(constants.ENCAPSULATOR.ZOOMING, zooming.value);
        });

        initializeValues();
    }
};

