var _ = require('underscore');

module.exports = function(app, config) {

	var agentApiClient = require('./services/agent-api-client').create(config);
	var featureToggle = require('./feature-toggle').create(config);

	// { unitName: "<unitName>", versionId: "<versionId>" }
	app.post("/deploy/to-all-agents", app.ensureLoggedIn, function(req, res) {

		agentApiClient.getUnitListForAllAgents(function(results) {

			var filterUnitsByUnitName = function(unit) {
				return unit.name === req.body.unitName;
			};

			results.forEach(function(item) {

				if (_.find(item.units, filterUnitsByUnitName)) {
					agentApiClient.sendCommand(item.agent.name, '/deploy/deploy', req.body, req.user);
				}

			});

			res.json('ok');
		});

	});

	// request json body
	// { agentName: "<agentName>", unitName: "<unitName>" }
	app.post("/deploy/deploy", app.ensureLoggedIn, function(req, res) {

		var annotationsConfig = featureToggle.getActiveFeature('deployAnnotations');
		if (annotationsConfig.enabled === true) {
			var correlationId = req.cookies[annotationsConfig.deployIdCookie];
			if (correlationId) {
				req.body.correlationId = correlationId;
			}
		}

		agentApiClient.sendCommand(req.body.agentName, '/deploy/deploy', req.body, req.user);
		res.json('ok');
	});

};