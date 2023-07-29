var fun = require("../../../uki-core/function"),
    utils = require("../../../uki-core/utils"),

    Base = require("./base").Base;

var DELIMITER = '|RANDOM_DELIMITER|';

var TagsArray = fun.newClass(Base, {
  def: [],

  setValue: function(obj, value) {
    if (!utils.isArray(value)) {
      if (value && value.trim()) {
        obj[this.propName] = value.trim().split('\n');
      } else {
        obj[this.propName] = [];
      }
    } else {
      obj[this.propName] = value;
    }
  },

  exportFormatter: function(value) {
    if (utils.isArray(value)) {
      return JSON.stringify(value);
    } else {
      return value;
    }
  },

  setTabSeparated: function(storable, value, callback) {
    if (value.charAt(0) == '[') {
      this.setValue(storable, JSON.parse(value));
    } else {
      this.setValue(storable, value);
    }
    callback();
  },

  compare: function(a, b) {
    if (!utils.isArray(a)) {
      if (a && a.trim()) {
        a = a.trim().split('\n');
      }
    }

    if (!utils.isArray(b)) {
      if (b && b.trim()) {
        b = b.trim().split('\n');
      }
    }

    return (a || []).join(DELIMITER) === (b || []).join(DELIMITER);
  }
});

TagsArray.prototype.compareDB = TagsArray.prototype.compare;

exports.TagsArray = TagsArray;
