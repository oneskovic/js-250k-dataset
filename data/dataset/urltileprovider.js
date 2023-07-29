/**
 * @fileoverview Contains abstract class describing object providing tiles.
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 */

goog.provide('we.texturing.URLTileProvider');

goog.require('we.texturing.Tile');
goog.require('we.texturing.Tile.State');
goog.require('we.texturing.TileProvider');



/**
 * Abstract class describing object providing tiles based on URLs
 * @param {string} name Name.
 * @constructor
 * @extends {we.texturing.TileProvider}
 * @inheritDoc
 */
we.texturing.URLTileProvider = function(name) {
  goog.base(this, name);

  /**
   * @type {string}
   * @private
   */
  this.proxyHost_ = '';
};
goog.inherits(we.texturing.URLTileProvider, we.texturing.TileProvider);


/** @inheritDoc */
we.texturing.URLTileProvider.prototype.canUseProxy = function() {return true;};


/** @inheritDoc */
we.texturing.URLTileProvider.prototype.setProxyHost = function(url) {
  var result = this.proxyHost_ != url;
  this.proxyHost_ = url;
  return result;
};


/**
 * @param {number} zoom Zoom level.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {?string} URL of the tile.
 * @protected
 */
we.texturing.URLTileProvider.prototype.getTileURL = goog.abstractMethod;


/** @inheritDoc */
we.texturing.URLTileProvider.prototype.loadTileInternal =
    function(tile, onload, opt_onerror) {
  var image = new Image();
  var onload_ = function() {
    //if (goog.DEBUG)
    //  we.texturing.TileProvider.logger.info('Loaded tile ' + tile.getKey());
    tile.state = we.texturing.Tile.State.LOADED;
    this.loadingTileCounter--;
    onload(tile);
  };
  var onerror_ = function() {
    if (goog.DEBUG) {
      we.texturing.TileProvider.logger.severe('Error loading tile: ' +
                                              tile.getKey() + ' (' +
                                              this.name + ')');
    }
    tile.failed++;
    tile.state = we.texturing.Tile.State.ERROR;
    this.loadingTileCounter--;
    if (opt_onerror) opt_onerror(tile);
  };
  image.onload = goog.bind(onload_, this);
  image.onerror = goog.bind(onerror_, this);
  tile.state = we.texturing.Tile.State.LOADING;
  tile.setImage(image);
  image.crossOrigin = '';
  var url = this.getTileURL(tile.zoom, tile.x, tile.y);

  image.src = this.proxyHost_ + url;

  //if (goog.DEBUG)
  //  we.texturing.TileProvider.logger.info('Loading tile ' + tile.getKey());

  this.loadingTileCounter++;
};
