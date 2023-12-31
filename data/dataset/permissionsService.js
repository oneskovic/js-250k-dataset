define(['angular'], function(angular) {
    'use strict';

    
    return angular.module('superdesk.services.permissions', [])
        .service('permissionsService', ['$q', '$rootScope', 'em', function($q, $rootScope, em) {

            this.isUserAllowed = function(permissions, user) {
                var self = this;

                var delay = $q.defer();

                if (!user) {
                    user = $rootScope.currentUser;
                }
                if (user.role) {
                    if (typeof user.role === 'string') {
                        em.repository('user_roles').find(user.role).then(function(role) {
                            delay.resolve(self.isRoleAllowed(permissions, role));
                        });
                    } else {
                        delay.resolve(this.isRoleAllowed(permissions, user.role));
                    }
                } else {
                    delay.resolve(false);
                }

                return delay.promise;
            };

            this._isRoleAllowedSingle = function(resource, method, role) {
                var self = this;

                var delay = $q.defer();

                if (role.permissions && role.permissions[resource] && role.permissions[resource][method]) {
                    delay.resolve(true);
                } else if (role['extends']) {
                    em.repository('user_roles').find(role['extends']).then(function(extendedFrom) {
                        delay.resolve(self._isRoleAllowedSingle(resource, method, extendedFrom));
                    });
                }

                return delay.promise;
            };

            this.isRoleAllowed = function(permissions, role) {
                var self = this;

                var delay = $q.defer();

                var promises = [];

                _.forEach(permissions, function(methods, resource) {
                    _.forEach(methods, function(status, method) {
                        promises.push(self._isRoleAllowedSingle(resource, method, role));
                    });
                });

                $q.all(promises).then(function(results) {
                    if (results.indexOf(false) === -1) {
                        delay.resolve(true);
                    } else {
                        delay.resolve(false);
                    }
                });

                return delay.promise;
            };

        }]);
});
