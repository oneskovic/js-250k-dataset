(function() {
  define(function(require, exports, module) {
    var ModeSwitch, makeToggleFocusable, node, _ref;
    _ref = require('lib/utils'), node = _ref.node, makeToggleFocusable = _ref.makeToggleFocusable;
    ModeSwitch = Backbone.View.extend({
      className: 'modeswitch selectable',
      template: require('lib/templates/mode_switch'),
      events: {
        'click': 'onClick'
      },
      initialize: function() {
        this.project = app.console.project;
        this.project.on('change:mode', this.render, this);
        this.$el.attr({
          tabIndex: '4'
        });
        makeToggleFocusable(this.el);
        return this.render();
      },
      render: function() {
        var mode;
        this.$el.html(this.template());
        mode = this.project.get('mode');
        if (mode) {
          this.$('.mode-live').addClass('is-selected');
          this.$('.selection').html('Updates: <span>live</span>');
        } else {
          this.$('.mode-save').addClass('is-selected');
          this.$('.selection').html('Updates: <span>on save</span>');
        }
        return this;
      },
      onClick: function(e) {
        if ($(e.target).hasClass('mode-live')) {
          this.project.save({
            mode: 1
          });
        }
        if ($(e.target).hasClass('mode-save')) {
          return this.project.save({
            mode: 0
          });
        }
      }
    });
    return module.exports = ModeSwitch;
  });

}).call(this);
