define([
    'angular'
], function(angular) {
    'use strict';

    return angular.module('superdesk.directives.sort', ['superdesk.asset'])
        
        .directive('sdSort', ['$location', 'asset', function($location, asset) {
            return {
                scope: {
                    label: '@',
                    field: '@'
                },
                templateUrl: asset.templateUrl('superdesk/views/sdSort.html'),
                link: function(scope, element, attrs) {

                    scope.loc = $location;
                    scope.sort = scope.loc.search().sort;

                    scope.$watch('(loc.search()).sort', function(val) {
                        scope.sort = val;
                    });

                    element.click(function() {
                        scope.$apply(function() {
                            if (scope.sort && scope.field === scope.sort[0]) {
                                //switch sort direction
                                $location.search('sort', [scope.field, scope.sort[1] === 'asc' ? 'desc' : 'asc']);
                            } else {
                                //set sort field
                                $location.search('sort', [scope.field, 'asc']);
                            }
                        });
                    });

                    element.addClass('sortable');
                }
            };
        }]);
});
