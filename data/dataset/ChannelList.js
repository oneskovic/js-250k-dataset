define(function(require) {
  var api = require('util/api');
  var avatarFallback = require('util/avatarFallback');
  var Backbone = require('backbone');
  var ChannelListDetails = require('views/content/ChannelListDetails');
  var l10nBrowser = require('l10n-browser');
  var template = require('text!templates/content/channelList.html');
  var localTemplate;

  var ChannelList = Backbone.View.extend({
    tagName: 'section',
    className: 'channelList',
    events: {
      'click img': '_showDetails',
      'click .showAll': '_showAll'
    },

    initialize: function() {
      if (!localTemplate) localTemplate = l10nBrowser.localiseHTML(template, {});
    },

    render: function() {
      if (this.channels.length > 0) {
        this.$el.css('display', '');
        this.$el.html(_.template(localTemplate, {
          title: this.options.title,
          channels: this.channels,
          avatarUrl: api.avatarUrl
        }));
        avatarFallback(this.$('img'), 'personal', 50);
      } else {
        this.$el.hide();
      }
    },

    addItem: function(toAdd) {
      if (this.channels) {
        this.channels.push(toAdd);
      }
    },

    removeItem: function(toRemove) {
      if (this.channels) {
        var self = this;
        for (var index in this.channels) {
          if (this.channels[index] === toRemove) {
            this.channels.splice(index, 1);
            // Should not have repeated channels
            return;
          }
        }
      }
    },

    _showAll: function() {
      this.$('img').show();
      this.$('.showAll').remove();
    },

    _showDetails: function(event) {
      var channelPosition = this.channels.indexOf(event.target.title);
      var inlinePosition = channelPosition % 4; // 4 = n. channels per line
      var appendPosition = channelPosition + (3 - inlinePosition); // 3 because it starts with 0

      this._removeOpenedView(event.target);
      if (this._selectedTarget === event.target) {
        // this makes possible to close the view if user click on the same target
        this._selectedTarget = null;
        return false;
      }

      this._selectedTarget = event.target;
      this._openedDetailsView = new ChannelListDetails({
        model: this.model,
        user: this.options.user,
        title: event.target.title,
        defaultRole: this.options.defaultRole,
        position: inlinePosition
      });
      $(this._selectedTarget).addClass('selected');
      this._appendDetails(appendPosition);
    },

    _appendDetails: function(position) {
      if (this.channels.length <= position) {
        this.$el.append(this._openedDetailsView.el);
      } else {
        this.$('img:eq(' + position + ')').after(this._openedDetailsView.el);
      }
    },

    _removeOpenedView: function() {
      if (this._openedDetailsView) {
        this._openedDetailsView.remove();
        this.$('.selected').removeClass('selected');
        this._openedDetailsView = null; // GC
      }
    }
  });

  return ChannelList;
});
