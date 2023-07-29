goog.provide('thin.core.toolaction.DrawAction');

goog.require('goog.events');
goog.require('goog.math.Rect');
goog.require('goog.math.Size');
goog.require('goog.math.Coordinate');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Dialog.EventType');
goog.require('thin.core.ListHelper');
goog.require('thin.core.ListHelper.SectionName');
goog.require('thin.core.AbstractDragger');
goog.require('thin.core.AbstractDragger.EventType');
goog.require('thin.core.HistoryManager');
goog.require('thin.core.HistoryManager.Mode');
goog.require('thin.core.toolaction.AbstractAction');


/**
 * @constructor
 * @extends {thin.core.toolaction.AbstractAction}
 */
thin.core.toolaction.DrawAction = function() {
  thin.core.toolaction.AbstractAction.call(this);
};
goog.inherits(thin.core.toolaction.DrawAction, thin.core.toolaction.AbstractAction);


/**
 * @param {number} startX
 * @param {number} startY
 * @param {number} clientX
 * @param {number} clientY
 * @return {boolean}
 * @private
 */
thin.core.toolaction.DrawAction.prototype.compareFn_ = function(startX, startY, clientX, clientY) {
  var diff = goog.math.Coordinate.difference(
               new goog.math.Coordinate(startX, startY),
               new goog.math.Coordinate(clientX, clientY));
  
  return diff.x == 0 || diff.y == 0;
};


/**
 * @param {goog.events.BrowserEvent} e
 * @param {goog.graphics.Element} outline
 * @protected
 */
thin.core.toolaction.DrawAction.prototype.handleStartAction = function(e, outline) {
  this.commonStartAction(e, outline);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @param {goog.graphics.Element} outline
 * @param {thin.core.Layer} handler
 * @param {boolean} captureActiveForStart
 * @param {boolean=} opt_isCancelDraw
 * @protected
 */
thin.core.toolaction.DrawAction.prototype.handleEndAction = function(
    e, outline, handler, captureActiveForStart, opt_isCancelDraw) {

  this.commonEndAction(e, outline, handler, captureActiveForStart, opt_isCancelDraw);
};


/**
 * @param {thin.core.Layer} handler
 * @param {goog.graphics.Element} outline
 * @param {boolean} isAspect
 * @param {Function=} opt_shiftFn
 * @protected
 */
thin.core.toolaction.DrawAction.prototype.drawLayerSetup = function(
      handler, outline, isAspect, opt_shiftFn) {
  
  var layout = this.layout;
  var helpers = layout.getHelpers();
  var listHelper = helpers.getListHelper();
  var eventType = goog.fx.Dragger.EventType;
  
  var drawer = new thin.core.SvgDrawer(outline, handler);
  drawer.setAspectObserve(isAspect);

  handler.setDrawer(drawer);
  handler.setDisposed(false);
  
  var isGlobalDrawLayer = handler == helpers.getDrawLayer();
  var captureActiveForStart = true;
  
  if (goog.isFunction(opt_shiftFn)) {
    drawer.addEventListener(thin.core.AbstractDragger.EventType.SHIFTKEYPRESS, opt_shiftFn, false, drawer);
  }
  
  drawer.addEventListener(thin.core.AbstractDragger.EventType.BEFORESTART, function(e) {
    this.setAdsorptionX(helpers.getAdsorptionX());
    this.setAdsorptionY(helpers.getAdsorptionY());
    
    if (!isGlobalDrawLayer && 'list' == layout.getWorkspace().getUiStatusForAction()) {
      return false;
    }
    
    captureActiveForStart = listHelper.isActive();
    if (isGlobalDrawLayer && captureActiveForStart) {
      helpers.disableAll();
      listHelper.inactive();
    }
    return true;
  }, false, drawer);
  
  drawer.addEventListener(eventType.START, function(e) {
    this.handleStartAction(e, outline);
  }, false, this);
  drawer.addEventListener(eventType.END, function(e) {
    var isCancelDraw = this.compareFn_(e.startX, e.startY, e.endX, e.endY);
    this.handleEndAction(e, outline, handler, captureActiveForStart, isCancelDraw);
  }, false, this);
};