var fun = require("../../../uki-core/function");

var Base = require("./base").Base;


var FlatArray = fun.newClass(Base, {
  def: [],
  delimiter: ',',

  tsFindByName: function(name, obj, callback) {
    return callback(name);
  },

  getTabSeparated: function(obj) {
    return this.getValue(obj).join(this.delimiter + ' ');
  },

  setTabSeparated: function(obj, value, callback) {
    var result = [];
    require("../../../lib/async").forEach(
      value.split(this.delimiter),
      function(name, _, iteratorCallback) {
        name = name.trim();
        if (!name) {
          iteratorCallback();
          return;
        }

        this.tsFindByName(name, obj, function(item) {
          if (item) { result.push(item); }
          iteratorCallback();
        });
      },
      function() {
        this.setValue(obj, result);
        callback();
      },
      this);
  },

  compare: function(a, b) {
    return (a || []).join(',') === (b || []).join(',');
  }
});

FlatArray.prototype.compareDB = FlatArray.prototype.compare;


exports.FlatArray = FlatArray;
