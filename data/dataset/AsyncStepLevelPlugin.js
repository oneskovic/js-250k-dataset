"use strict";

var $ = require('../../Array');
var Platform = require('../../Platform');
var BasePlugin = require('./BasePlugin');

module.exports.init = function(options) {

    /* jslint shadow: true */
    var options = options || {};
    var platform = new Platform();
    var container = options.container || platform.get_container();

    var base_plugin = BasePlugin.create(options);

    function scenarios(scenarios, iterator) {
        if (!options.silenceDeprecations) {
            console.log('*******************************************************************************');
            console.log('* AsyncStepLevelPlugin has been deprecated and will soon be removed.          *');
            console.log('* Use the ScenarioLevelPlugin instead.                                        *');
            console.log('* To turn off this message add silenceDeprecations: true to the init options. *');
            console.log('*******************************************************************************');
        }
        $(scenarios).each(function(scenario) {
            base_plugin.describe(scenario.title, scenario, iterator);
        });
    }

    function steps(steps, iterator) {
        var abort;
        $(steps).each(function(step) {
            base_plugin.it_async(step, step, function(step, done) {
                if (abort) return done();
                iterator(step, function(err) {
                    if (err) abort = true;
                    done(err);
                });
            });
        });
    }

    container.featureFiles = container.featureFile = base_plugin.featureFiles;
    container.features = container.feature = base_plugin.features;
    container.scenarios = container.scenario = scenarios;
    container.steps = steps;
};
