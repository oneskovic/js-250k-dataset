IonicModule
.factory('$ionicBackdrop', [
  '$document', '$timeout',
function($document, $timeout) {

  var el = jqLite('<div class="backdrop">');
  var backdropHolds = 0;

  $document[0].body.appendChild(el[0]);

  return {
    /**
     * @ngdoc method
     * @name $ionicBackdrop#retain
     * @description Retains the backdrop.
     */
    retain: retain,
    /**
     * @ngdoc method
     * @name $ionicBackdrop#release
     * @description
     * Releases the backdrop.
     */
    release: release,

    getElement: getElement,

    // exposed for testing
    _element: el
  };

  function retain() {
    if ((++backdropHolds) === 1) {
      el.addClass('visible');
      ionic.requestAnimationFrame(function() {
        backdropHolds && el.addClass('active');
      });
    }
  }
  function release() {
    if ((--backdropHolds) === 0) {
      el.removeClass('active');
      $timeout(function() {
        !backdropHolds && el.removeClass('visible');
      }, 400, false);
    }
  }

  function getElement() {
    return el;
  }

}]);
