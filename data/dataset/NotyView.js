(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/NotyView', ['views/ProtoView', 'models/NotyModel', 'underscore', 'jquery', 'helpers'], function(ProtoView, NotyModel, _, $, helpers) {
    var NotyView, _ref;

    NotyView = (function(_super) {
      __extends(NotyView, _super);

      function NotyView() {
        _ref = NotyView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NotyView.prototype.model = NotyModel;

      NotyView.prototype.template = '#noty-view-template';

      NotyView.prototype.className = 'noty-l';

      NotyView.prototype.leftTransitionTime = 250;

      NotyView.prototype.events = {
        'click': 'hide',
        'mouseenter': 'stopTimer',
        'mouseleave': 'startTimer'
      };

      NotyView.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        this.bindModelEvents();
        NotyView.__super__.initialize.apply(this, arguments);
        return this;
      };

      NotyView.prototype.bindModelEvents = function() {
        return this.model.on('change', this.render);
      };

      NotyView.prototype.render = function() {
        var _this = this;

        NotyView.__super__.render.apply(this, arguments);
        this.$el.slideDown();
        setTimeout(function() {
          _this.$el.addClass('is-show');
          return _this.startTimer();
        }, 400);
        return this;
      };

      NotyView.prototype.startTimer = function() {
        var _this = this;

        clearTimeout(this.timer);
        return this.timer = setTimeout(function() {
          return _this.hide();
        }, this.model.get('delay'));
      };

      NotyView.prototype.stopTimer = function() {
        return clearTimeout(this.timer);
      };

      NotyView.prototype.hide = function() {
        var _this = this;

        this.$el.removeClass('is-show');
        return setTimeout(function() {
          _this.model.destroy();
          return _this.teardown();
        }, this.leftTransitionTime);
      };

      return NotyView;

    })(ProtoView);
    return NotyView;
  });

}).call(this);
