define([
  'amd!../lib/underscore',
  '../lib/jquery',
  './UnmanagedComponent',
  'common-ui/vizapi/DataTable',
  'common-ui/vizapi/VizController',
  'common-ui/vizapi/Events'],
  function(_, $, UnmanagedComponent) {

  var VisualizationAPIComponent = UnmanagedComponent.extend({

    update: function() {
      var render = _.bind(this.render, this);
      this.triggerQuery(this.queryDefinition, render);
    },

    render: function(data) {
      var vizDiv = this.placeholder()[0];
      var visualization = this.getVisualization();
      var vizOptions = this.getVizOptions();
      var gDataTable = this.createGoogleDataTable(data);

      var controller = new pentaho.VizController(0);
      controller.setDomNode(vizDiv);
      controller.setDataTable(gDataTable);
      controller.setVisualization(visualization, vizOptions);
    },

    getVizOptions: function() {
      var myself = this;
      var options = {};
      $.each(this.vizOptions, function(i, v) {
        var key = v[0];
        var value = myself.dashboard.getParameterValue(v[1]);
        options[key] = value;
      });
      return options;
    },

    getVisualization: function() {
      return pentaho.visualizations.getById(this.vizId);
    },

    createGoogleDataTable: function(resultJson) {
      return new pentaho.DataTable(resultJson);
    }

  });

  return VisualizationAPIComponent;

});
