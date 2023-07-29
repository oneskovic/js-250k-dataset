;(function(history) {
  
  AjaxSolr.ParameterHistoryStore = AjaxSolr.ParameterStore.extend(
    /** @lends AjaxSolr.ParameterHistoryStore.prototype */
    {
    init: function () {
      if (this.exposed.length) {
        if (!history) {
          throw 'ParameterHistoryStore requires History.js';
        }

        history.Adapter.bind(window, 'statechange', this.stateChangeFunction(this));
      }
    },

    /**
     * Stores the values of the exposed parameters in both the local hash and History.js
     * No other code should be made to change these two values.
     */
    save: function () {
      this.hash = this.exposedString();
      history.pushState({ params: this.hash }, null, '?' + this.hash);
    },

    /**
     * @see ParameterStore#storedString()
     */
    storedString: function () {
      var state = history.getState();

      // Load the state from the History object.
      if (state.data && state.data.params) {
        return state.data.params;
      }

      // If initial load, load the state from the URL.
      var url = state.cleanUrl, index = url.indexOf('?');
      if (index == -1) {
        return '';
      }
      else {
        return url.substr(index + 1);
      }
    },

    /**
     * Called when History.js detects a state change. Checks if state is different to previous state, 
     * and if so, sends a request to Solr. This needs to check if the state has changed since it also
     * gets called when we call pushState above.
     */
    stateChangeFunction: function (self) {
      return function () {
        var hash = self.storedString();

        if (self.hash != hash) {
          self.load();
          self.manager.doRequest();
        }
      }
    }
  });
})(window.History);
