/**
 * @author benvanik@google.com (Ben Vanik)
 */

goog.provide('gf.io.DirectoryEntry');

goog.require('gf.io.Entry');



/**
 * A directory entry.
 *
 * @interface
 * @extends {gf.io.Entry}
 */
gf.io.DirectoryEntry = function() {};


/**
 * Behaviors for getting files and directories.
 * @enum {number}
 */
gf.io.DirectoryEntry.Behavior = {
  /** Get the file if it exists, error out if it doesn't. */
  DEFAULT: 1,
  /** Get the file if it exists, create it if it doesn't. */
  CREATE: 2,
  /** Error out if the file exists, create it if it doesn't. */
  CREATE_EXCLUSIVE: 3
};


/**
 * Gets a file within this directory.
 * @param {string} path Path to the file, relative to this directory.
 * @param {gf.io.DirectoryEntry.Behavior=} opt_behavior Behavior for handling
 *     an existing file, or the lack thereof.
 * @return {!goog.async.Deferred} A deferred fulfilled when the file has
 *     been queried. Successful callbacks receive the
 *     {@see gf.io.FileEntry} for the path.
 */
gf.io.DirectoryEntry.prototype.getFile = goog.nullFunction;


/**
 * Gets a directory within this directory.
 * @param {string} path Path to the directory, relative to this directory.
 * @param {gf.io.DirectoryEntry.Behavior=} opt_behavior Behavior for handling
 *     an existing directory, or the lack thereof.
 * @return {!goog.async.Deferred} A deferred fulfilled when the directory has
 *     been queried. Successful callbacks receive the
 *     {@see gf.io.DirectoryEntry} for the path.
 */
gf.io.DirectoryEntry.prototype.getDirectory = goog.nullFunction;


/**
 * Gets the directory for the given path, creating the directory and any
 * intermediate directories as necessary.
 * @param {string} path The directory path to create. May be absolute or
 *     relative to the current directory. The parent directory '..' and current
 *     directory '.' are supported.
 * @return {!goog.async.Deferred} A defered fulfilled when the directory has
 *     been created. Successful callbacks receive the
 *     {@see gf.io.DirectoryEntry} for the final path.
 */
gf.io.DirectoryEntry.prototype.createPath = goog.nullFunction;


/**
 * Gets a list of all entries in this directory.
 * @return {!goog.async.Deferred} A deferred fulfilled when the operation
 *     completes. Successful callbacks receive a list of {@see gf.io.Entry}
 *     instances.
 */
gf.io.DirectoryEntry.prototype.listDirectory = goog.nullFunction;


/**
 * Removes this directory and all of its contents.
 * @return {!goog.async.Deferred} A deferred fulfilled when the operation
 *     completes.
 */
gf.io.DirectoryEntry.prototype.removeRecursively = goog.nullFunction;
