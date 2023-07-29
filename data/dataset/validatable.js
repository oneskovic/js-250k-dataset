var utils = require("../../../uki-core/utils");

/**
* Support for per prop and full model validations
* @mixin
*/
var Validatable = {
  validate: function(name) {
    var prop = this.storage().prop(name);

    var error = false;
    var humanName = prop.humanName || prop.tabSeparated || prop.name;
    if (prop.validate) {
      error = prop.validate(this);
    } else if (prop.required) {
      error = !prop.getValue(this);
      this.toggleError(error, prop.name, humanName + ' required');
    }
    return error;
  },

  validateAll: function() {
    this._suppressErrorEvents = true;
    this._errorsChanged = false;
    this.storage().props().forEach(function(p) {
      this.validate(p.name, false);
    }, this);
    this._suppressErrorEvents = false;
    if (this._errorsChanged) {
      this.errors(utils.extend({}, this.errors())).commitChanges('errors');
    }
    return this;
  },

  toggleError: function(state, key, message) {
    var e = this._errors = this._errors || { count: 0 },
    changed = true;

    if (state && !e[key]) {
      e[key] = message;
      e.count++;
    } else if (!state && e[key]) {
      delete e[key];
      e.count--;
      e.count = Math.max(0, e.count); // sanity check
    } else if (state && e[key] && e[key] !== message) {
      e[key] = message;
    } else {
      changed = false;
    }
    if (changed) {
      if (this._suppressErrorEvents) {
        this._errorsChanged = true;
        this._errors = e;
      } else {
        // force trigger
        this.errors(utils.extend({}, e)).commitChanges('errors');
      }
    }
  },

  isValid: function() {
    return !this.errors() || !this.errors().count;
  },

  errorsFor: function(name) {
    return this.errors() && this.errors()[name];
  },

  hasErrors: function() {
    return !this.isValid();
  }

};


exports.Validatable = Validatable;
