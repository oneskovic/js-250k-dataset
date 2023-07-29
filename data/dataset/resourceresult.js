var _ = require('underscore');
var url = require('url');

var azureCommon = require('azure-common');
var Constants = azureCommon.Constants;
var atomHandler = azureCommon.atomHandler;

exports = module.exports;

function setName(entry, nameProperty) {
  var parsedUrl = url.parse(entry[Constants.ATOM_METADATA_MARKER].id);
  var parts = parsedUrl.pathname.split('/');

  for (var i = 0; (i * 2) < (parts.length - 1); i++) {
    entry[nameProperty[i]] = parts[(i * 2) + 1];
  }
}

exports.serialize = function (resourceName, resource, properties) {
  var content = {};
  content[resourceName] = {
    '$': {
      'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns': 'http://schemas.microsoft.com/netservices/2010/10/servicebus/connect'
    }
  };

  if (resource) {
    // Sort properties according to what is allowed by the service
    _.each(properties, function (property) {
      if (!_.isUndefined(resource[property])) {
        content[resourceName][property] = resource[property];
      }
    });
  }

  return atomHandler.serializeEntry(content);
};

exports.parse = function (resourceName, nameProperty, xml) {
  var result = atomHandler.parse(xml);

  if (_.isArray(result)) {
    _.each(result, function (entry) {
      setName(entry, nameProperty);
    });
  } else {
    setName(result, nameProperty);
  }

  return result;
};