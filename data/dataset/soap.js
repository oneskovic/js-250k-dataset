var _ = require('underscore');
var Q = require('q');
var soap = require('soap');
var Source = require('../source');

/**
* @class SoapSource
* @constructor
* @param {Object} sourceParams
* An object describing the source to be added.
*/
var SoapSource = Source.extend({
	request: function(requestParams) {
		return new Q(requestParams)
			.then(this._mergeRequestAndSourceParams)
			.then(this._sendRequestAndHandleResponse);
	},

	_sendRequestAndHandleResponse: function(requestParams) {
		var url = requestParams.url;
		var wsdlPath = requestParams.wsdlPath;
		var soapMethod = requestParams.soapMethod;
		var data = requestParams.data;
		var headers = requestParams.headers;
		var security = requestParams.security;
		var options = {
			endpoint: url
		};

		return Q.ninvoke(soap, 'createClient', wsdlPath, options)
		.then(function(client) {
			return Q.promise(function(resolve, reject) {
				if (security) {
					client.setSecurity(
						new soap.BasicAuthSecurity(
							security.username,
							security.password
						)
					);
				}
				client[soapMethod](data, function(err, response) {
					if (err) {
						return reject(err);
					}
					resolve(response);
				}, null, headers);
			});
		});

	}
});

module.exports = SoapSource;
