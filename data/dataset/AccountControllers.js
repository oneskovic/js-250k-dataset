(function(acralyzerConfig,angular,acralyzer,acralyzerEvents) {
    "use strict";

    function AccountCtrl($scope, $user, $dialog) {
        $scope.$on(acralyzerEvents.LOGIN_CHANGE, function(event, $user) {
            $scope.username = $user.username;
            $scope.isAdmin  = $user.isAdmin;
        });

        $scope.showLogin = function() {
            var d = $dialog.dialog({
                templateUrl: 'partials/login-dialog.html',
                controller:  'LoginDialogCtrl'
            });
            d.open().then(function(result){
            });
        };
        $scope.showChangePassword = function() {
            if ($user.canChangePassword() === false) {
                alert("Sorry, your couchdb setup does not allow you to change an admins password");
                return;
            }
            var d = $dialog.dialog({
                templateUrl: 'partials/change-password.html',
                controller:  'ChangePasswordDialogCtrl'
            });
            d.open().then(function(result){
            });
        };

        $scope.logout = function() {
            $user.logout();
        };
    }

    function LoginDialogCtrl($scope, $user, dialog) {
        $scope.username = "";
        $scope.password = "";
        $scope.pending = false;
        $scope.badUsername = false;

        $scope.close = function(result) {
            if (this.disabled) { return; }
            $scope.pending = true;
            $scope.badUsername = false;
            $user.login($scope.username, $scope.password).then(
                function(data) {
                    $scope.pending = false;
                    dialog.close();
                },
                function(data) {
                    $scope.badUsername = true;
                    $scope.pending = false;
                }
            );

        };
    }

    function ChangePasswordDialogCtrl($scope, $user, dialog) {
        $scope.isAdmin  = $user.isAdmin;
        $scope.username = $user.username;
        $scope.password = "";
        $scope.confirm_password = "";
        $scope.pending = false;

        $scope.close = function(password) {
            if (this.disabled) { return; }
            $scope.pending = true;
            $scope.errmessage = null;
            $user.changePassword($scope.password).then(
                function() {
                    
                    $scope.pending = false;
                    dialog.close();
                },
                function(result) {
                    /* error */
                    $scope.pending = false;
                    $scope.errmessage = result;
                }
            );
        };
    }

    acralyzer.controller('AccountCtrl', ['$scope','$user','$dialog', AccountCtrl]);
    acralyzer.controller('LoginDialogCtrl', ['$scope','$user','dialog', LoginDialogCtrl]);
    acralyzer.controller('ChangePasswordDialogCtrl', ['$scope', '$user', 'dialog', ChangePasswordDialogCtrl]);

})(window.acralyzerConfig,window.angular,window.acralyzer, window.acralyzerEvents);
