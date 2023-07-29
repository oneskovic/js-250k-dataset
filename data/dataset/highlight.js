(function() {
    'use strict';

    HighlightsService.$inject = ['api', '$q', 'packagesService'];
    function HighlightsService(api, $q, packagesService) {
        this.createEmptyHighlight = function createEmptyHighlight(highlight) {
            var pkg_defaults = {
                headline: highlight.name || '',
                highlight: highlight._id || ''
            };

            return packagesService.createEmptyPackage(pkg_defaults);
        };
    }

    var app = angular.module('superdesk.highlight', [
        'superdesk.packaging',
        'superdesk.activity',
        'superdesk.api'
    ]);

    app
    .service('highlightsService', HighlightsService)
    .config(['superdeskProvider', function(superdesk) {
        superdesk
        .activity('create.highlight', {
            label: gettext('Create highlight'),
            controller: ['data', 'highlightsService', 'superdesk',
                function(data, highlightsService, superdesk) {
                    if (data) {
                        highlightsService.createEmptyHighlight(data).then(
                            function(new_package) {
                            superdesk.intent('author', 'package', new_package);
                        });
                    } else {
                        superdesk.intent('create', 'package');
                    }
            }],
            filters: [
                {action: 'create', type: 'highlight'}
            ]
        });
    }]);

    return app;
})();
