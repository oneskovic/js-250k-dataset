(function() {
  var Adapter, Myth, W,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter_base');

  W = require('when');

  Myth = (function(_super) {
    var compile;

    __extends(Myth, _super);

    function Myth() {
      return Myth.__super__.constructor.apply(this, arguments);
    }

    Myth.prototype.name = 'myth';

    Myth.prototype.extensions = ['myth', 'mcss'];

    Myth.prototype.output = 'css';

    Myth.prototype._render = function(str, options) {
      return compile((function(_this) {
        return function() {
          return _this.engine(str);
        };
      })(this));
    };

    compile = function(fn) {
      var err, res;
      try {
        res = fn();
      } catch (_error) {
        err = _error;
        return W.reject(err);
      }
      return W.resolve(res);
    };

    return Myth;

  })(Adapter);

  module.exports = Myth;

}).call(this);
