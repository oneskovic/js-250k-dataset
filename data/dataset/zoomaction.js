goog.provide('thin.core.toolaction.ZoomAction');

goog.require('thin.core.toolaction.AbstractAction');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.math.Coordinate');
goog.require('thin.core.Cursor');


/**
 * @constructor
 * @extends {thin.core.toolaction.AbstractAction}
 */
thin.core.toolaction.ZoomAction = function() {
  thin.core.toolaction.AbstractAction.call(this);
};
goog.inherits(thin.core.toolaction.ZoomAction, thin.core.toolaction.AbstractAction);


/**
 * @param {thin.core.Layer} zoomLayer
 * @private
 */
thin.core.toolaction.ZoomAction.prototype.setZoomOutMode_ = function(zoomLayer) {
  var cursor = thin.core.Cursor.getCursorByName('ZOOMOUT');
  zoomLayer.setCursor(cursor);
  this.layout.setElementCursor(zoomLayer.getElement(), cursor);
};


/**
 * @param {thin.core.Layer} zoomLayer
 * @private
 */
thin.core.toolaction.ZoomAction.prototype.setZoomInMode_ = function(zoomLayer) {
  var cursor = thin.core.Cursor.getCursorByName('ZOOMIN');
  zoomLayer.setCursor(cursor);
  this.layout.setElementCursor(zoomLayer.getElement(), cursor);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
thin.core.toolaction.ZoomAction.prototype.setZoomMode_ = function(e) {
  if (e.keyCode == goog.events.KeyCodes.ALT) {
    var zoomLayer = this.layout.getHelpers().getZoomLayer();
    if (e.altKey) {
      this.setZoomOutMode_(zoomLayer);
    } else {
      this.setZoomInMode_(zoomLayer);
    }
  }
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
thin.core.toolaction.ZoomAction.prototype.handleMouseDownAction_ = function(e) {
  var workspace = this.workspace;
  workspace.focusElement(e);
  var zoom = workspace.getUiStatusForZoom();
  zoom = e.altKey ? thin.numberWithPrecision(zoom - 10, 0) : 
                    thin.numberWithPrecision(zoom + 10, 0);
  workspace.getAction().actionSetZoom(zoom, this.calculatePosition_(e));
  e.preventDefault();
};


/**
 * @param {goog.events.BrowserEvent} e
 * @return {goog.math.Coordinate}
 * @private
 */
thin.core.toolaction.ZoomAction.prototype.calculatePosition_ = function(e) {
  var layout = this.layout;
  var bounds = layout.getOffsetTarget().getBoundingClientRect();
  var rate = layout.getPixelScale();
  return new goog.math.Coordinate(
           thin.numberWithPrecision((e.clientX - bounds.left) / rate), 
           thin.numberWithPrecision((e.clientY - bounds.top) / rate));
};


/**
 * @param {goog.events.BrowserEvent} e
 * @param {thin.core.Workspace} workspace
 * @protected
 */
thin.core.toolaction.ZoomAction.prototype.handleActionInternal = function(e, workspace) {

  var eventType = goog.events.EventType;
  var zoomLayer = this.layout.getHelpers().getZoomLayer();
  zoomLayer.setDisposed(false);
  this.setZoomInMode_(zoomLayer);
  
  zoomLayer.addEventListener(eventType.MOUSEDOWN, this.handleMouseDownAction_, false, this);

  var eventHandler = workspace.getHandler();
  var workspaceElement = workspace.getElement();
  eventHandler.listen(workspaceElement, eventType.KEYDOWN, this.setZoomMode_, false, this);
  eventHandler.listen(workspaceElement, eventType.KEYUP, this.setZoomMode_, false, this);

  zoomLayer.setVisibled(true);
};
