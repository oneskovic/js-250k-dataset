(function() {
  define(function(require, exports, module) {
    var Resizer, getStyle;
    require('vendor/link!css/resizer.css');
    getStyle = require('lib/utils').getStyle;
    Resizer = Backbone.View.extend({
      events: {
        'mousedown': 'onMouseDown'
      },
      initialize: function(opt) {
        _.bindAll(this, 'onMouseMove', 'onMouseUp', 'onDOMLoaded', 'onSelection');
        this.target = $(opt.target);
        if (this.name = opt.name) {
          this.STORE_KEY_PROP = "_resizer_" + this.name + "_prop";
          this.STORE_KEY = "_resizer_" + this.name;
          this.setFlexValue(opt.target, sessionStorage.getItem(this.STORE_KEY_PROP), sessionStorage.getItem(this.STORE_KEY));
        }
        return _.delay(this.onDOMLoaded, 100);
      },
      setFlexValue: function(el, prop, value) {
        if (!prop) {
          return;
        }
        if (value < this.min) {
          value = this.min;
        }
        if (this.max && value > this.max) {
          value = max;
        }
        $(el).css(prop, parseInt(value));
        if (this.name) {
          sessionStorage.setItem(this.STORE_KEY, value);
          return sessionStorage.setItem(this.STORE_KEY_PROP, prop);
        }
      },
      onDOMLoaded: function() {
        var parent;
        parent = this.$el.parent();
        this.orient = parent.css('-webkit-box-orient') || parent.css('-moz-box-orient');
        this.prop = this.orient === 'horizontal' ? 'width' : 'height';
        this.min = parseInt(this.target.css('min-' + this.prop), 10);
        return this.max = parseInt(this.target.css('max-' + this.prop), 10);
      },
      onSelection: function(e) {
        e.stopPropagation();
        return e.preventDefault();
      },
      onMouseDown: function(e) {
        var sidebar_right;
        $(window).on('mousemove', this.onMouseMove).bind('mouseup', this.onMouseUp);
        $(document).on('selectstart', this.onSelection);
        sidebar_right = app.Settings.get('sidebar_right');
        this.startPosition = this.orient === 'horizontal' ? e.clientX * (sidebar_right ? -1 : 1) : e.clientY;
        this.startValue = parseInt(this.target.css(this.prop), 10);
        this.target.addClass('is-resizing');
        e.stopPropagation();
        return e.preventDefault();
      },
      onMouseMove: function(e) {
        var currentPosition, sidebar_right, value;
        sidebar_right = app.Settings.get('sidebar_right');
        currentPosition = this.orient === 'horizontal' ? e.clientX * (sidebar_right ? -1 : 1) : e.clientY;
        value = this.startValue + currentPosition - this.startPosition;
        this.setFlexValue(this.target, this.prop, value);
        this.trigger('resize');
        e.stopPropagation();
        return e.preventDefault();
      },
      onMouseUp: function() {
        $(window).off('mousemove', this.onMouseMove).off('mouseup', this.onMouseUp);
        $(document).off('selectstart', this.onSelection);
        return this.target.removeClass('is-resizing');
      }
    });
    return module.exports = Resizer;
  });

}).call(this);
