/**
 * Constructs a ConsArray object. It is used mainly for tree traversal.
 * In this use case we have lots of arrays that we need to iterate
 * sequentally. The internal Array implementation is horribly slow
 * when concatenating on large (10K items) arrays due to memory copying.
 * That's why we avoid copying memory and insead build a linked list
 * of arrays to iterate through.
 *
 * @constructor
 */
function ConsArray() {
  this.tail_ = new ConsArray.Cell(null, null);
  this.currCell_ = this.tail_;
  this.currCellPos_ = 0;
};


/**
 * Concatenates another array for iterating. Empty arrays are ignored.
 * This operation can be safely performed during ongoing ConsArray
 * iteration.
 *
 * @param {Array} arr Array to concatenate.
 */
ConsArray.prototype.concat = function(arr) {
  if (arr.length > 0) {
    this.tail_.data = arr;
    this.tail_ = this.tail_.next = new ConsArray.Cell(null, null);
  }
};


/**
 * Whether the end of iteration is reached.
 */
ConsArray.prototype.atEnd = function() {
  return this.currCell_ === null ||
      this.currCell_.data === null ||
      this.currCellPos_ >= this.currCell_.data.length;
};


/**
 * Returns the current item, moves to the next one.
 */
ConsArray.prototype.next = function() {
  var result = this.currCell_.data[this.currCellPos_++];
  if (this.currCellPos_ >= this.currCell_.data.length) {
    this.currCell_ = this.currCell_.next;
    this.currCellPos_ = 0;
  }
  return result;
};


/**
 * A cell object used for constructing a list in ConsArray.
 *
 * @constructor
 */
ConsArray.Cell = function(data, next) {
  this.data = data;
  this.next = next;
};
