var module = angular.module('transactions', ['network']);

module.factory('rpTransactions', ['$rootScope', 'rpNetwork',
                                  function($scope, net) {
  var listeners = [],
      subscribed = false;

  function subscribe() {
    if (subscribed) return;
    net.remote.requestSubscribe("transactions").request();
    subscribed = true;
  }

  function handleTransaction(msg) {
    $scope.$apply(function () {
      listeners.forEach(function (fn) {
        fn(msg);
      });
    });
  }

  net.remote.on('net_transaction', handleTransaction);

  return {
    addListener: function (fn) {
      listeners.push(fn);
      subscribe();
    },
    removeListener: function (fn) {
      var position = -1;
      for (var i = 0, l = listeners.length; i < l; i++) {
        if (listeners[i] === fn) {
          position = i;
        }
      }
      if (position < 0) return;
      listeners.splice(position, 1);
    }
  };
}]);
