var _ = require('underscore'),
    resources = require('../util/resources');

module.exports = plugin;


function plugin(options) {
  var _options = options;
  return {
    priority: 50,

    resourceList: function(context, next, complete) {
      var module = context.module;
      var resource = context.resource;
      var found = false;

      resource = resources.cast(resource);

      for (var key in _options) {
        if (_options.hasOwnProperty(key)) {
          if (resource.hasOwnProperty(key)) {
            if (resource[key] !== _options[key]) {
              found = true;
              break;
            }
          }
        }
      }

      if (found) {
        complete(undefined, []);
      } else {
        next(complete);
      }
    }
  };
}


