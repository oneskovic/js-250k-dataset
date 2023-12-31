define( [], function() {

  return function( rootElement, clickHandler, elementTitle, startState ){
    var _element = rootElement;

    if ( startState !== false && startState !== true ) {
      startState = false;
    }

    _element.title = elementTitle || "Show/Hide";

    rootElement.addEventListener( "mousedown", function( e ) {
      // Disable text selection in chrome while clicking.
      e.preventDefault();
    } );

    if ( clickHandler ) {
      _element.addEventListener( "click", clickHandler );
    }

    Object.defineProperties( this, {
      element: {
        enumerable: true,
        get: function(){
          return _element;
        }
      },
      state: {
        enumerable: true,
        get: function() {
          return _element.classList.contains( "toggled" );
        },
        set: function( state ) {
          if ( state ) {
            _element.classList.add( "toggled" );
          }
          else {
            _element.classList.remove( "toggled" );
          }
        }
      },
      visible: {
        enumerable: true,
        get: function(){
          return _element.style.display !== "none";
        },
        set: function( val ){
          _element.style.display = val ? "block" : "none";
        }
      }
    });

    this.state = startState;

  };
});
