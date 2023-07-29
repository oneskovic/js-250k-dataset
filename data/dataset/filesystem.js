/**
 * @author benvanik@google.com (Ben Vanik)
 */

goog.provide('gf.io.FileSystem');

goog.require('goog.Disposable');
goog.provide('gf.io.FileSystemType');


/**
 * File system type.
 * @enum {number}
 */
gf.io.FileSystemType = {
  /**
   * The file system is temporary and will not be used past this session.
   * The files inside the file system are not guaranteed to exist for the
   * duration of the session. In general, no permissions are needed and this
   * is likely to succeed.
   */
  TEMPORARY: 0,

  /**
   * The file system is persistent and will be available across sessions.
   * The user may deny the request or the quota may exceed user settings.
   */
  PERSISTENT: 1
};



/**
 * Base class for file system implementations.
 *
 * @constructor
 * @extends {goog.Disposable}
 * @param {gf.io.FileSystemType} type Requested type.
 * @param {number} size Maximum size, in bytes, of the requested file system.
 */
gf.io.FileSystem = function(type, size) {
  goog.base(this);

  /**
   * The type of the file system.
   * @type {gf.io.FileSystemType}
   */
  this.type = type;

  /**
   * The requested size of the file system, in bytes.
   * @type {number}
   */
  this.size = size;
};
goog.inherits(gf.io.FileSystem, goog.Disposable);


/**
 * @return {!gf.io.DirectoryEntry} Gets the root directory entry in the file
 *     system.
 */
gf.io.FileSystem.prototype.getRoot = goog.abstractMethod;
