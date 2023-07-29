define(function(require) {
  var AbstractEditStream = require('views/content/AbstractEditStream');
  var api = require('util/api');
  var Backbone = require('backbone');
  var config = require('config');
  var l10nBrowser = require('l10n-browser');
  var Events = Backbone.Events;
  var template = require('text!templates/content/createChannel.html');
  var localTemplate;

  var CreateChannelStream = AbstractEditStream.extend({

    events: {
      'click .save': 'create',
      'click .discard': 'render',
      'change #channel_default_role': '_toggleHint'
    },

    _toggleHint: function() {
      var $defaultRole = this.$('#channel_default_role');
      var value = $defaultRole.val();
      var $hint = $defaultRole.next('.hint');
      $hint.removeClass('followerSelected followerPlusSelected').addClass(value + 'Selected');
    },

    initialize: function() {
      if (!localTemplate) localTemplate = l10nBrowser.localiseHTML(template, {});
      this._initialize();
      this.render();
    },

    render: function() {
      this.$el.html(_.template(localTemplate, {
        domain: this._topicsDomain()
      }));
      document.redraw();
    },

    _topicsDomain: function() {
      return '@topics.' + config.homeDomain;
    },

    create: function() {
      var channel = this._getChannel();
      var self = this;
      if (channel) {
        channel += this._topicsDomain();
        this.model = this.options.user.metadata(channel);
        var options = {
          type: 'POST',
          url: api.url(channel),
          crossDomain: true,
          xhrFields: {withCredentials: true},
          contentType: false,
          processData: false,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization',
              self.options.user.credentials.authorizationHeader());
          },
          success: function() {
            self.saveMetadata();
          },
          error: function() {
            self._createErrorCallback();
          }
        };

        this._disableCreateButton();
        $.ajax(options);
      }
    },

    saveMetadata: function() {
      this.listenToOnce(this.model, 'sync', this._channelCreated());
      this._save(this.model);
    },

    _channelCreated: function() {
      var channel = this.model.channel;
      var subscribedChannels = this.options.user.subscribedChannels;
      return function() {
        subscribedChannels.set(channel + '/posts', 'owner', {silent: true});
        Events.once('navigate', function(destiny) {
          if (channel === destiny) {
            Events.trigger('channelCreated', channel);
          }
        });
        Events.trigger('navigate', channel);
      };
    },

    _disableCreateButton: function() {
      this.$('.save').addClass('disabled').text('Creating...');
    },

    _createErrorCallback: function() {
      var $createButton = this.$('.save');
      $createButton.removeClass('disabled').addClass('completed');
      $createButton.text('Error');
      setTimeout(function() {
        $createButton.removeClass('completed');
        $createButton.text('Create');
      }, 7000);
    },

    _getChannel: function() {
      return this.$('#channel_jid').val();
    },

    _check: function(element, value) {
      if (element) {
        element.attr('checked', value);
      }
    }
  });

  return CreateChannelStream;
});
