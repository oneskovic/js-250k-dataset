goog.provide('ol.source.Image');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('ol.Attribution');
goog.require('ol.Extent');
goog.require('ol.array');
goog.require('ol.source.Source');



ol.source.ImageOptions;



/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing a single image.
 *
 * @constructor
 * @extends {ol.source.Source}
 * @param {ol.source.ImageOptions} options Single image source options.
 * @api
 */
ol.source.Image = function(options) {

  goog.base(this, {
    attributions: options.attributions,
    extent: options.extent,
    logo: options.logo,
    projection: options.projection,
    state: options.state
  });

  /**
   * @private
   * @type {Array.<number>}
   */
  this.resolutions_ = goog.isDef(options.resolutions) ?
      options.resolutions : null;
  goog.asserts.assert(goog.isNull(this.resolutions_) ||
      goog.array.isSorted(this.resolutions_,
          function(a, b) {
            return b - a;
          }, true));

};
goog.inherits(ol.source.Image, ol.source.Source);


/**
 * @return {Array.<number>} Resolutions.
 */
ol.source.Image.prototype.getResolutions = function() {
  return this.resolutions_;
};


/**
 * @protected
 * @param {number} resolution Resolution.
 * @return {number} Resolution.
 */
ol.source.Image.prototype.findNearestResolution =
    function(resolution) {
  if (!goog.isNull(this.resolutions_)) {
    var idx = ol.array.linearFindNearest(this.resolutions_, resolution, 0);
    resolution = this.resolutions_[idx];
  }
  return resolution;
};


/**
 * @param {ol.Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @param {ol.proj.Projection} projection Projection.
 * @return {ol.ImageBase} Single image.
 */
ol.source.Image.prototype.getImage = goog.abstractMethod;


/**
 * Default image load function for image sources that use ol.Image image
 * instances.
 * @param {ol.Image} image Image.
 * @param {string} src Source.
 */
ol.source.Image.defaultImageLoadFunction = function(image, src) {
  image.getImage().src = src;
};
