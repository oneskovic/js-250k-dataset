/**
 * @fileoverview Implements a 3D ray that are compatible with WebGL.
 * Each element is a float64 in case high precision is required.
 * The API is structured to avoid unnecessary memory allocations.
 * The last parameter will typically be the output vector and an
 * object can be both an input and output parameter to all methods
 * except where noted.
 *
 */
goog.provide('goog.vec.Ray');

goog.require('goog.vec.Vec3');



/**
 * Constructs a new ray with an optional origin and direction. If not specified,
 * the default is [0, 0, 0].
 * @param {goog.vec.Vec3.AnyType=} opt_origin The optional origin.
 * @param {goog.vec.Vec3.AnyType=} opt_dir The optional direction.
 * @constructor
 */
goog.vec.Ray = function(opt_origin, opt_dir) {
  /**
   * @type {goog.vec.Vec3.Float64}
   */
  this.origin = goog.vec.Vec3.createFloat64();
  if (opt_origin) {
    goog.vec.Vec3.setFromArray(this.origin, opt_origin);
  }

  /**
   * @type {goog.vec.Vec3.Float64}
   */
  this.dir = goog.vec.Vec3.createFloat64();
  if (opt_dir) {
    goog.vec.Vec3.setFromArray(this.dir, opt_dir);
  }
};


/**
 * Sets the origin and direction of the ray.
 * @param {goog.vec.AnyType} origin The new origin.
 * @param {goog.vec.AnyType} dir The new direction.
 */
goog.vec.Ray.prototype.set = function(origin, dir) {
  goog.vec.Vec3.setFromArray(this.origin, origin);
  goog.vec.Vec3.setFromArray(this.dir, dir);
};


/**
 * Sets the origin of the ray.
 * @param {goog.vec.AnyType} origin the new origin.
 */
goog.vec.Ray.prototype.setOrigin = function(origin) {
  goog.vec.Vec3.setFromArray(this.origin, origin);
};


/**
 * Sets the direction of the ray.
 * @param {goog.vec.AnyType} dir The new direction.
 */
goog.vec.Ray.prototype.setDir = function(dir) {
  goog.vec.Vec3.setFromArray(this.dir, dir);
};


/**
 * Returns true if this ray is equal to the other ray.
 * @param {goog.vec.Ray} other The other ray.
 * @return {boolean} True if this ray is equal to the other ray.
 */
goog.vec.Ray.prototype.equals = function(other) {
  return other != null &&
      goog.vec.Vec3.equals(this.origin, other.origin) &&
      goog.vec.Vec3.equals(this.dir, other.dir);
};
