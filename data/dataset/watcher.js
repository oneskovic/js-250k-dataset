angular.module('a8m.filter-watcher', [])
  .provider('filterWatcher', function() {

    this.$get = ['$window', '$rootScope', function($window, $rootScope) {

      /**
       * Cache storing
       * @type {Object}
       */
      var $$cache = {};

      /**
       * Scope listeners container
       * scope.$destroy => remove all cache keys
       * bind to current scope.
       * @type {Object}
       */
      var $$listeners = {};

      /**
       * $timeout without triggering the digest cycle
       * @type {function}
       */
      var $$timeout = $window.setTimeout;

      /**
       * @description
       * get `HashKey` string based on the given arguments.
       * @param fName
       * @param args
       * @returns {string}
       */
      function getHashKey(fName, args) {
        return [fName, angular.toJson(args)]
          .join('#')
          .replace(/"/g,'');
      }

      /**
       * @description
       * fir on $scope.$destroy,
       * remove cache based scope from `$$cache`,
       * and remove itself from `$$listeners`
       * @param event
       */
      function removeCache(event) {
        var id = event.targetScope.$id;
        forEach($$listeners[id], function(key) {
          delete $$cache[key];
        });
        delete $$listeners[id];
      }

      /**
       * @description
       * for angular version that greater than v.1.3.0
       * it clear cache when the digest cycle is end.
       */
      function cleanStateless() {
        $$timeout(function() {
          if(!$rootScope.$$phase)
            $$cache = {};
        });
      }

      /**
       * @description
       * Store hashKeys in $$listeners container
       * on scope.$destroy, remove them all(bind an event).
       * @param scope
       * @param hashKey
       * @returns {*}
       */
      function addListener(scope, hashKey) {
        var id = scope.$id;
        if(isUndefined($$listeners[id])) {
          scope.$on('$destroy', removeCache);
          $$listeners[id] = [];
        }
        return $$listeners[id].push(hashKey);
      }

      /**
       * @description
       * return the `cacheKey` or undefined.
       * @param filterName
       * @param args
       * @returns {*}
       */
      function $$isMemoized(filterName, args) {
        var hashKey = getHashKey(filterName, args);
        return $$cache[hashKey];
      }

      /**
       * @description
       * store `result` in `$$cache` container, based on the hashKey.
       * add $destroy listener and return result
       * @param filterName
       * @param args
       * @param scope
       * @param result
       * @returns {*}
       */
      function $$memoize(filterName, args, scope, result) {
        var hashKey = getHashKey(filterName, args);
        //store result in `$$cache` container
        $$cache[hashKey] = result;
        // for angular versions that less than 1.3
        // add to `$destroy` listener, a cleaner callback
        if(isScope(scope)) {
          addListener(scope, hashKey);
        } else {
          cleanStateless();
        }
        return result;
      }

      return {
        isMemoized: $$isMemoized,
        memoize: $$memoize
      }

    }];
  });
  
