/* jslint node: true */
"use strict";

var English = require('../../localisation/English');
var Platform = require('../../Platform');
var FeatureFileParser = require('../../parsers/FeatureFileParser');
var $ = require('../../Array');

module.exports.create = function(options) {

    /* jslint shadow: true */
    var platform = new Platform();
    var language = options.language || English;
    var parser = options.parser || new FeatureFileParser(language);
    var container = options.container || platform.get_container();

    function featureFiles(files, iterator) {
        $(files).each(function(file) {
            features(parser.parse(file), iterator);
        });
    }

    function features(features, iterator) {
        $(features).each(function(feature) {
            describe(feature.title, feature, iterator);
        });
    }

    function describe(title, subject, iterator) {
        var _describe = getDescribe(subject.annotations);
        _describe(title, function() {
            iterator(subject);
        });
    }

    function it_async(title, subject, iterator) {
        var _it = getIt(subject.annotations);
        _it(title, function(done) {
            iterator(subject, done);
        });
    }

    function it_sync(title, subject, iterator) {
        var _it = getIt(subject.annotations);
        _it(title, function() {
            iterator(subject);
        });
    }

    function getIt(annotations, next) {
        if (has_annotation(annotations, 'pending')) return container.xit;
        if (has_annotation(annotations, 'only')) return container.it.only;
        return container.it;
    }

    function getDescribe(annotations, next) {
        if (has_annotation(annotations, 'pending')) return container.xdescribe;
        if (has_annotation(annotations, 'only')) return container.describe.only;
        return container.describe;
    }

    function has_annotation(annotations, name) {
        var regexp = new RegExp('^' + language.localise(name) + '$');
        for (var key in annotations) {
            if (regexp.test(key)) return true;
        }
    }

    return {
        featureFiles: featureFiles,
        features: features,
        describe: describe,
        it_async: it_async,
        it_sync: it_sync
    };
};
