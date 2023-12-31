/**
 * @fileoverview A wrapper for the HTML5 FileWriter object.
 *
 * When adding or modifying functionality in this namespace, be sure to update
 * the mock counterparts in goog.testing.fs.
 *
 */

goog.provide('goog.fs.FileWriter');

goog.require('goog.fs.Error');
goog.require('goog.fs.FileSaver');



/**
 * An object for monitoring the saving of files, as well as other fine-grained
 * writing operations.
 *
 * This should not be instantiated directly. Instead, it should be accessed via
 * {@link goog.fs.FileEntry#createWriter}.
 *
 * @param {!FileWriter} writer The underlying FileWriter object.
 * @constructor
 * @extends {goog.fs.FileSaver}
 * @final
 */
goog.fs.FileWriter = function(writer) {
  goog.fs.FileWriter.base(this, 'constructor', writer);

  /**
   * The underlying FileWriter object.
   *
   * @type {!FileWriter}
   * @private
   */
  this.writer_ = writer;
};
goog.inherits(goog.fs.FileWriter, goog.fs.FileSaver);


/**
 * @return {number} The byte offset at which the next write will occur.
 */
goog.fs.FileWriter.prototype.getPosition = function() {
  return this.writer_.position;
};


/**
 * @return {number} The length of the file.
 */
goog.fs.FileWriter.prototype.getLength = function() {
  return this.writer_.length;
};


/**
 * Write data to the file.
 *
 * @param {!Blob} blob The data to write.
 */
goog.fs.FileWriter.prototype.write = function(blob) {
  try {
    this.writer_.write(blob);
  } catch (e) {
    throw new goog.fs.Error(e, 'writing file');
  }
};


/**
 * Set the file position at which the next write will occur.
 *
 * @param {number} offset An absolute byte offset into the file.
 */
goog.fs.FileWriter.prototype.seek = function(offset) {
  try {
    this.writer_.seek(offset);
  } catch (e) {
    throw new goog.fs.Error(e, 'seeking in file');
  }
};


/**
 * Changes the length of the file to that specified.
 *
 * @param {number} size The new size of the file, in bytes.
 */
goog.fs.FileWriter.prototype.truncate = function(size) {
  try {
    this.writer_.truncate(size);
  } catch (e) {
    throw new goog.fs.Error(e, 'truncating file');
  }
};
