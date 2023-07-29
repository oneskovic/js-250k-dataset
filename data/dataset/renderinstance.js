/**
 * @author benvanik@google.com (Ben Vanik)
 */

goog.provide('gf.mdl.RenderInstance');

goog.require('gf.mdl.Instance');
goog.require('goog.webgl');



/**
 * An instance of a model that can be rendered.
 *
 * @constructor
 * @extends {gf.mdl.Instance}
 * @param {!gf.mdl.RenderModel} model Model this instance represents.
 */
gf.mdl.RenderInstance = function(model) {
  goog.base(this, model);

  /**
   * Graphics context.
   * @private
   * @type {!gf.graphics.GraphicsContext}
   */
  this.graphicsContext_ = model.getGraphicsContext();

  /**
   * Geometry resource, not owned.
   * @private
   * @type {!gf.mdl.GeometryResource}
   */
  this.geometryResource_ = model.getGeometryResource();
};
goog.inherits(gf.mdl.RenderInstance, gf.mdl.Instance);


/**
 * Renders the instance.
 * @param {!goog.vec.Mat4.Float32} transform Instance world transform.
 */
gf.mdl.RenderInstance.prototype.render = function(transform) {
  var ctx = this.graphicsContext_;
  var gl = ctx.getGL();

  // Setup geometry
  this.geometryResource_.bind();

  // Draw
  var parts = this.model.getParts();
  for (var n = 0; n < parts.length; n++) {
    var part = parts[n];

    // Set program
    // TODO(benvanik): set program, transform, and any material uniforms

    // Draw
    gl.drawElements(
        part.primitiveType,
        part.elementCount,
        goog.webgl.UNSIGNED_SHORT,
        part.elementOffset);
  }
};
