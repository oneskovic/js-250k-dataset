/**
 * Creates a new system controller and listens to the model and the view
 *
 * @class Controller for the system
 * @param {Toe.Model.SystemView} pModel system model
 * @param {Toe.View.System} pView system view
 */
Toe.Ctrl.SystemController = function(sModel, sView) {
    /** 
     * @event
     * event type: vRenderSystem
     * @param {Toe.Model.System} aSystem system to render
     */
    $(sModel).bind("vRenderSystem", function(event, aSystem) {
        if (Toe.debug) {
            sView.renderSystemBoundingBox(aSystem);
        }
        sView.renderSystem(aSystem);
    });
    Toe.Ctrl.Controller.call(this, sModel, sView);
};

Toe.Ctrl.SystemController.prototype = new Toe.Ctrl.Controller();
Toe.Ctrl.SystemController.prototype.constructor = Toe.Ctrl.SystemController;

/**
 * Handles dimension and position change.
 *
 * @param {float} aWidth new width
 * @param {float} aHeight new height
 * @param {float} aXLeft new x-left position
 * @param {float} aYTop new y-top position
 */
Toe.Ctrl.SystemController.prototype.modifyDimensions = function(aWidth, aHeight, aXLeft, aYTop) {

    var boundingBox = [aXLeft, aYTop, aXLeft + aWidth, aYTop + aHeight];
    this.model.setBoundingBox(boundingBox);
};

/**
 * Modifies zone according to the left and width.
 *
 * @param {float} aCenterX  new horizontal center
 * @param {float} aWidth    new width
 */
Toe.Ctrl.SystemController.prototype.modifyZone = function(aCenterX, aWidth) {

    var boundingBox = [aCenterX - aWidth / 2,
                       this.model.zone.uly,
                       aCenterX + aWidth / 2,
                       this.model.zone.lry];
    this.model.setBoundingBox(boundingBox);
};
