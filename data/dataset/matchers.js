(function() {

  window.Capybara || (window.Capybara = {});

  Capybara.Recorders || (Capybara.Recorders = {});

  Capybara.Recorders.Matchers = (function() {

    Matchers.prototype.matchers = [];

    Matchers.prototype.namespace = 'matcherrecorder';

    function Matchers(options) {
      var _ref;
      this.$scope = $(options.scope || document);
      this.afterCaptureCallback = (_ref = options.afterCapture) != null ? _ref : function() {};
    }

    Matchers.prototype.start = function() {
      return this._attachEvents();
    };

    Matchers.prototype.stop = function() {
      return this._detachEvents();
    };

    Matchers.prototype.shouldHaveSelector = function($el) {
      var selection, selector;
      selection = window.getSelection().toString();
      if (selection.length) {
        return this.shouldHaveContent($el, selection);
      } else {
        selector = $el.getSelector();
        return this.capture('shouldHaveSelector', selector, $el);
      }
    };

    Matchers.prototype.shouldHaveContent = function($el) {
      var content, selector;
      content = window.getSelection().toString();
      selector = $el.getSelector();
      return this.capture('shouldHaveContent', selector, $el, null, {
        content: content
      });
    };

    Matchers.prototype.capture = function(name, selector, $el, scope, options) {
      var matcher;
      if (scope == null) {
        scope = null;
      }
      if (options == null) {
        options = {};
      }
      if (!($el.parents('#capycorder').length > 0)) {
        matcher = {
          type: 'matcher',
          name: name,
          selector: selector,
          scope: scope,
          options: options
        };
        this.matchers.push(matcher);
        return this.afterCaptureCallback(matcher);
      }
    };

    Matchers.prototype._nsevent = function(event) {
      return [event, this.namespace].join('.');
    };

    Matchers.prototype._attachEvents = function() {
      var _this = this;
      return $(document).on(this._nsevent('mouseup'), function(e) {
        return _this.shouldHaveSelector($(e.target));
      });
    };

    Matchers.prototype._detachEvents = function() {
      return $(document).off(this._nsevent('mouseup'));
    };

    return Matchers;

  })();

}).call(this);
