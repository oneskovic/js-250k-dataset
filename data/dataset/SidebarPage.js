define(function(require) {
  var ActionBar = require('views/sidebar/ActionBar');
  var Backbone = require('backbone');
  var Channels = require('views/sidebar/Channels');
  var PersonalChannel = require('views/sidebar/PersonalChannel');

  var SidebarPage = Backbone.View.extend({
    className: 'sidebar hidden',

    initialize: function() {
      this.personalChannel = new PersonalChannel({model: this.model});
      this.actionBar = new ActionBar();
      this.channels = new Channels({model: this.model});
      this.render();
    },

    render: function() {
      var $sidebar = $('.sidebar');
      $sidebar.append(this.personalChannel.el);
      $sidebar.append(this.actionBar.render().el);
      $sidebar.append(this.channels.el);
      $sidebar.removeClass('hidden');
    },

    destroy: function() {
      $('.sidebar').addClass('hidden');
      this.personalChannel.remove();
      this.actionBar.remove();
      this.channels.remove();
      this.remove();
    },

    selectChannel: function(channel) {
      this.personalChannel.selectChannel(channel);
      this.channels.selectChannel(channel);
    },

    unSelectChannel: function() {
      this.personalChannel.selectChannel('');
      this.channels.selectChannel('');
    }
  });

  return SidebarPage;
});
