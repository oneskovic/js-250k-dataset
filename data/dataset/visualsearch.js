/** @license VisualSearch.js 0.4.0
 *  (c) 2011 Samuel Clay, @samuelclay, DocumentCloud Inc.
 *  VisualSearch.js may be freely distributed under the MIT license.
 *  For all details and documentation:
 *  http://documentcloud.github.com/visualsearch
 */

(function() {

  var $ = jQuery; // Handle namespaced jQuery

  // Setting up VisualSearch globals. These will eventually be made instance-based.
  if (!window.VS) window.VS = {};
  if (!VS.app)    VS.app    = {};
  if (!VS.ui)     VS.ui     = {};
  if (!VS.model)  VS.model  = {};
  if (!VS.utils)  VS.utils  = {};

  // Sets the version for VisualSearch to be used programatically elsewhere.
  VS.VERSION = '0.5.0';

  VS.VisualSearch = function(options) {
    var defaults = {
      container   : '',
      query       : '',
      autosearch  : true,
      unquotable  : [],
      remainder   : 'text',
      showFacets  : true,
      readOnly    : false,
      callbacks   : {
        search          : $.noop,
        focus           : $.noop,
        blur            : $.noop,
        facetMatches    : $.noop,
        valueMatches    : $.noop,
        clearSearch     : $.noop,
        removedFacet    : $.noop
      }
    };
    this.options           = _.extend({}, defaults, options);
    this.options.callbacks = _.extend({}, defaults.callbacks, options.callbacks);
    
    VS.app.hotkeys.initialize();
    this.searchQuery   = new VS.model.SearchQuery();
    this.searchBox     = new VS.ui.SearchBox({
        app: this, 
        showFacets: this.options.showFacets
    });

    if (options.container) {
      var searchBox = this.searchBox.render().el;
      $(this.options.container).html(searchBox);
    }
    this.searchBox.value(this.options.query || '');

    // Disable page caching for browsers that incorrectly cache the visual search inputs.
    // This forces the browser to re-render the page when it is retrieved in its history.
    $(window).bind('unload', function(e) {});

    // Gives the user back a reference to the `searchBox` so they
    // can use public methods.
    return this;
  };

  // Entry-point used to tie all parts of VisualSearch together. It will either attach
  // itself to `options.container`, or pass back the `searchBox` so it can be rendered
  // at will.
  VS.init = function(options) {
    return new VS.VisualSearch(options);
  };

})();
