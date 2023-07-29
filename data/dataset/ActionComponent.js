define(['amd!../lib/underscore', './UnmanagedComponent', '../dashboard/Utils'],
  function(_, UnmanagedComponent, Utils) {

  var ActionComponent = UnmanagedComponent.extend({
    _docstring: function() {
      return "Abstract class for components calling a query/endpoint";
    },

    
    update: function() {
      var render = _.bind(this.render, this);
      if(_.isUndefined(this.manageCallee) || this.manageCallee) {
        this.synchronous(render);
      } else {
        render();
      }
    },

    /**
     *  Calls the endpoint, passing any parameters.
     *  This method is typically bound to the "click" event of the component.
     */
    triggerAction: function() {
      var params = Utils.propertiesArrayToObject(this.actionParameters);
      var failureCallback =  (this.failureCallback) ?  _.bind(this.failureCallback, this) : function() {};
      var successCallback = this.successCallback ?  _.bind(this.successCallback, this) : function() {};

      return this.dashboard.getQuery(this.actionDefinition).fetchData(params, successCallback, failureCallback);
    },

    /**
     *  Detect if the endpoint associated with the Action is defined
     */
    hasAction: function() {
      if(!this.actionDefinition){
        return false;
      }
      if(this.dashboard.detectQueryType) {
        return !!this.dashboard.detectQueryType(this.actionDefinition);
      } else {
        return !!this.actionDefinition.queryType && this.dashboard.hasQuery(this.actionDefinition.queryType);
      }
    }
  });

  return ActionComponent;

});
