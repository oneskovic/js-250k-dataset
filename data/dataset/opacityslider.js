/**
 * @fileoverview UI Slider for changing overlay opacity.
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 */

goog.provide('weapp.ui.OpacitySlider');

goog.require('goog.Disposable');
goog.require('goog.events');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Slider');

goog.require('we.scene.Scene');



/**
 * Creates new slider for changing opacity of the overlay on the given earth.
 * @param {!we.scene.Earth} earth Earth.
 * @param {!Element} element Element to append this slider to.
 * @constructor
 * @extends {goog.Disposable}
 */
weapp.ui.OpacitySlider = function(earth, element) {
  /**
   * @type {!we.scene.Earth}
   * @private
   */
  this.earth_ = earth;

  /**
   * @type {!goog.ui.Slider}
   * @private
   */
  this.slider_ = new goog.ui.Slider();
  this.slider_.setOrientation(goog.ui.SliderBase.Orientation.HORIZONTAL);
  this.slider_.setMinimum(0);
  this.slider_.setMaximum(1);
  this.slider_.setStep(0.01);
  this.slider_.setMoveToPointEnabled(true);

  this.slider_.setValue(earth.overlayOpacity);

  /**
   * @type {?number}
   * @private
   */
  this.listenKey_ = goog.events.listen(this.slider_,
      goog.ui.Component.EventType.CHANGE,
      function(e) {
        earth.overlayOpacity = e.target.getValue();
      });

  this.slider_.render(element);
};
goog.inherits(weapp.ui.OpacitySlider, goog.Disposable);


/** @inheritDoc */
weapp.ui.OpacitySlider.prototype.disposeInternal = function() {
  //goog.base(this, 'disposeInternal');
  goog.events.unlistenByKey(this.listenKey_);

  this.slider_.dispose();
};
