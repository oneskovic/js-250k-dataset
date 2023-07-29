var fun = require("../uki-core/function");

var UserStorage = fun.newClass({
  init: function(uid, project) {
    this.uid = uid || '';
    this.project = project || '';
    this.storage = global.localStorage;
  },

  // local storage API
  setItem: function(key, value) {
    this.setString(key, JSON.stringify(value));
  },

  getItem: function(key) {
    var value = this.getString(key);
    return value && JSON.parse(value);
  },

  deleteItem: function(key) {
    delete this.storage[this._buildKey(key)];
  },

  // raw string API
  setString: function(key, value) {
    this.storage[this._buildKey(key)] = value;
  },

  getString: function(key) {
    return this.storage[this._buildKey(key)];
  },

  _buildKey: function(key) {
    return [this.uid, this.project, key].join(':');
  },

  // clean up the current user storage for this project
  // hard_drop will delete all the keys
  cleanup: function(hard_drop) {
    hard_drop = hard_drop || false;
    var prefix = [this.uid, this.project].join(':');
    for (key in this.storage) {
      if (!key || this.storage[key] === undefined ||
        !this.storage.hasOwnProperty(key)) {
        continue;
      }
      if (!hard_drop && !key.match(prefix)) {
        continue;
      }
      delete this.storage[key];
    }
  }
});


exports.UserStorage = UserStorage;
