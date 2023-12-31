define(function(require){

  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var OriginView = require('coreJS/app/views/originView');
  var Origin = require('coreJS/app/origin');

  var ProjectView = OriginView.extend({

    tagName: 'li',

    className: 'project-list-item',

    events: {
      'dblclick'                        : 'editProject',
      'click'                           : 'selectProject',
      'click a.open-context-course'     : 'openContextMenu',
      'click a.course-delete'           : 'deleteProjectPrompt',

      // Preview events
      'mouseover .pos.large'            : 'showLargePreview',
      'mouseover .pos.medium'           : 'showMediumPreview',
      'mouseover .pos.small'            : 'showSmallPreview',
      'mouseout .pos.medium, .pos.small': 'showLargePreview'
    },

    preRender: function() {
      this.listenTo(Origin, 'dashboard:dashboardView:removeSubViews', this.remove);
      this.listenTo(this, 'remove', this.remove);
      this.listenTo(Origin, 'editorView:deleteProject:' + this.model.get('_id'), this.deleteProject);
      this.listenTo(Origin, 'dashboard:projectView:itemSelected', this.deselectItem);
      this.listenTo(Origin, 'dashboard:dashboardView:deselectItem', this.deselectItem);

      this.on('contextMenu:course:editSettings', this.editProjectSettings);
      this.on('contextMenu:course:edit', this.editProject);
      this.on('contextMenu:course:delete', this.deleteProjectPrompt);
      this.on('contextMenu:course:duplicate', this.duplicateProject);

      this.model.set('heroImageURI', this.model.getHeroImageURI());
    },

    openContextMenu: function (e) {
      e.stopPropagation();
      e.preventDefault();

      Origin.trigger('contextMenu:open', this, e);
    },

    editProjectSettings: function(event) {
      if (event) {
        event.preventDefault();  
      }
      
      Backbone.history.navigate('#/editor/' + this.model.get('_id') + '/settings', {trigger: true});    
    },

    editProject: function(event) {
      if (event) {
        event.preventDefault();  
      }
      
      Backbone.history.navigate('/editor/' + this.model.get('_id') + '/menu', {trigger: true});
    },

    selectProject: function(event) {
      event && event.preventDefault();

      this.selectItem();
    },

    selectItem: function() {
      Origin.trigger('dashboard:projectView:itemSelected');
      this.$el.addClass('selected');
      this.model.set({_isSelected:true});
    },

    deselectItem: function() {
      this.$el.removeClass('selected');
      this.model.set({_isSelected:false});
    },

    deleteProjectPrompt: function(event) {
      if (event) {
        event.preventDefault();
      }
      var id = this.model.get('_id');
      var deleteProject = {
          _type: 'prompt',
          _showIcon: true,
          title: window.polyglot.t('app.deleteproject'),
          body: window.polyglot.t('app.confirmdeleteproject') + '<br />' + '<br />' + window.polyglot.t('app.confirmdeleteprojectwarning'),
          _prompts: [
            {_callbackEvent: 'editorView:deleteProject:' + id, promptText: window.polyglot.t('app.ok')},
            {_callbackEvent: '', promptText: window.polyglot.t('app.cancel')}
          ]
        };

      Origin.trigger('notify:prompt', deleteProject);
    },

    deleteProject: function(event) {
      var self = this;

      self.model.destroy({
        success: function(model, response, options) {
          self.remove()
        },
        error: function(model, response, options) {
          alert('Error - ' + response.responseJSON.message);
        }
      });
    },

    duplicateProject: function() {
      $.ajax({
        url: this.model.getDuplicateURI(),
        success: function (data) {
          Backbone.history.navigate('/editor/' + data.newCourseId + '/settings', {trigger: true});
        },
        error: function() {
          alert('error during duplication');
        }
      });
    },

    showLargePreview: function() {
      this.$('iframe').removeClass();
      this.$('iframe').addClass('preview-large');
    },

    showMediumPreview: function() {
      this.$('iframe').removeClass();
      this.$('iframe').addClass('preview-medium');
    },

    showSmallPreview: function() {
      this.$('iframe').removeClass();
      this.$('iframe').addClass('preview-small');
    }
    
  }, {
    template: 'project'
  });

  return ProjectView;

});