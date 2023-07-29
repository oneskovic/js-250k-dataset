var fiveui = fiveui || {};

(function() {

/**
 * @constructor
 */
fiveui.Chan = function() {
  this.fns = {};
};

_.extend(fiveui.Chan.prototype, {

  /**
   * @param {!string} type
   * @param {!function(*)} fn
   */
  on: function(type, fn) {
    this.fns[type] = fn;
  },

  /**
   * @param {!string} type
   * @param {*} data
   */
  emit: function(type, data) {
    this.chan.fns[type](data);
  }

});

})();
