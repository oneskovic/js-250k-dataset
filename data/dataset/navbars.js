(function() {
  'use strict';

  var module = angular.module('mobile-angular-ui.components.navbars', []);

 /** 
  * @directive navbarAbsoluteTop
  * @restrict C
  * @description
  *
  * Setup absolute positioned top navbar.
  * 
  * ``` html
  *  <div class="navbar navbar-app navbar-absolute-top">
  *    <!-- ... -->
  *  </div>
  * ``` 
  */

 /** 
  * @directive navbarAbsoluteBottom
  * @restrict C
  * @description
  * 
  * Setup absolute positioned bottom navbar.
  * 
  * ``` html
  *  <div class="navbar navbar-app navbar-absolute-bottom">
  *    <!-- ... -->
  *  </div>
  * ``` 
  */
  angular.forEach(['top', 'bottom'], function(side) {
    var directiveName = 'navbarAbsolute' + side.charAt(0).toUpperCase() + side.slice(1);
    module.directive(directiveName, [
      '$rootElement',
      function($rootElement) {
        return {
          restrict: 'C',
          link: function(scope) {
            $rootElement.addClass('has-navbar-' + side);
            scope.$on('$destroy', function(){
              $rootElement.removeClass('has-navbar-' + side);
            });
            }
          };
        }
    ]);
  });

})();