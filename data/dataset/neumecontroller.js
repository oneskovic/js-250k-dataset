/**
 * Creates a new neume controller and listens to the model and the view
 *
 * @class Controller for the neume
 * @param {Toe.Model.Neume} pModel The neume model
 * @param {Toe.View.Neume} pView The neume view
 */
Toe.Ctrl.NeumeController = function(nModel, nView) {
    // LISTEN TO THE VIEW
    $(nModel).bind("mUpdateBoundingBox", function(event, nDrawing) {
        // get final bounding box from drawing
        var ulx = nDrawing.left - nDrawing.currentWidth/2;
        var uly = nDrawing.top - nDrawing.currentHeight/2;
        var lrx = ulx + nDrawing.currentWidth;
        var lry = uly + nDrawing.currentHeight;

        // reset the bounding box in the model with the final bounding box
        // of the drawing
        nModel.setBoundingBox([ulx, uly, lrx, lry]);
    });

    // LISTEN TO THE MODEL
    /** 
     * @event
     * event type: vRenderNeume
     * @param {Toe.Model.Neume} neume Neume to render
     */
    $(nModel).bind("vRenderNeume", function(event, neume) {
        // make sure neume type is known for it to be drawn properly
        if (!neume.typeid) {
            neume.deriveName();
        }

        if (Toe.debug) {
            nView.renderBoundingBox(neume);
        }

        nView.render(neume);
    });

    $(nModel).bind("vUpdateDrawing", function(event, neume) {
        nView.updateDrawing(neume);
    });

    $(nModel).bind("vEraseDrawing", function(event) {
        nView.eraseDrawing();
    });

    $(nModel).bind("vSelectDrawing", function(event) {
        nView.selectDrawing();
    });
    Toe.Ctrl.Controller.call(this, nModel, nView);
};

Toe.Ctrl.NeumeController.prototype = new Toe.Ctrl.Controller();
Toe.Ctrl.NeumeController.prototype.constructor = Toe.Ctrl.NeumeController;
