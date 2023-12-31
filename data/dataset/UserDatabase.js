(function() {
  'Simple wrapper for a taffy database. \n\nMight be extended to back up the database to local storage, a zip file, etc.';
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.UserDatabase = (function(_super) {
    __extends(UserDatabase, _super);

    function UserDatabase() {
      this.onDBChange = __bind(this.onDBChange, this);
      this.clear = __bind(this.clear, this);
      this.runQuery = __bind(this.runQuery, this);
      this.fromJSONArray = __bind(this.fromJSONArray, this);
      this.toString = __bind(this.toString, this);
      this.initLocalStorage = __bind(this.initLocalStorage, this);
      _ref = UserDatabase.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserDatabase.prototype.initialize = function() {
      this.database = TAFFY();
      return this.database.settings({
        onDBChange: this.onDBChange
      });
    };

    UserDatabase.prototype.initLocalStorage = function(namespace) {
      this.database.store(namespace + "-UserDatabase");
      return this.trigger("initLocalStorage");
    };

    UserDatabase.prototype.toString = function(pretty) {
      if (pretty) {
        return JSON.stringify(this.database().get(), null, 4);
      }
      return this.database().stringify();
    };

    UserDatabase.prototype.fromJSONArray = function(array) {
      return this.database.insert(array);
    };

    UserDatabase.prototype.runQuery = function(query) {
      var code;
      code = "(function(database) { " + query + " }).call(null, this.database)";
      return eval(code);
    };

    UserDatabase.prototype.clear = function() {
      return this.database().remove();
    };

    UserDatabase.prototype.onDBChange = function() {
      return this.trigger("onDBChange");
    };

    return UserDatabase;

  })(Backbone.Model);

}).call(this);
