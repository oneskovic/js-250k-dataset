define(['angular'], function(angular) {
    'use strict';

    return angular.module('superdesk.permissions.directives', [])
        
        .directive('sdPermissions', ['permissions', 'permissionsService', function(permissions, permissionsService) {
            return {
                scope: {
                    model: '=',
                    permission: '@',
                    role: '=',
                    user: '='
                },
                link: function(scope, element, attrs) {
                    scope.model = false;
                    if (permissions[scope.permission]) {
                        var requiredPermissions = permissions[scope.permission].permissions;
                        if (scope.role) {
                            scope.model = permissionsService.isRoleAllowed(requiredPermissions, scope.role);
                        } else if (scope.user) {
                            permissionsService.isUserAllowed(requiredPermissions, scope.user).then(function(result) {
                                scope.model = result;
                            });
                        } else {
                            permissionsService.isUserAllowed(requiredPermissions).then(function(result) {
                                scope.model = result;
                            });
                        }

                    }
                }
            };
        }]);
});
