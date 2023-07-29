define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  
  ng
  .module( 'cs_common.filters' )
  .filter( 'startsWith', function() {

    return function( str, letter, prop ) {
      letter = letter || undefined;
      if ( !letter ) {
        return str;
      }
      var filtered = [];
      str.forEach( function( i ) {
        if ( ( new RegExp( '^[' + letter.toLowerCase() + letter.toUpperCase() + ']' ) ).test( i[ prop ] ) ) {
          filtered.push( i );
        }
      });
      return filtered;
    };
  });

});
