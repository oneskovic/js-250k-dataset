define(['./SelectBaseComponent', '../lib/jquery'], function(SelectBaseComponent, $) {
  var SelectMultiComponent = SelectBaseComponent.extend({

    /**
     * Gets the values selected of the select tag
     *
     * @returns {array|*} an empty array or the values selected
     */
    getValue : function() {
      var ph = this.placeholder("select");
      var val = ph.val();
      return val == null ? [] : val;
    },

    /**
     * Obtains the normalized and defaulted value of
     * the {@link #isMultiple} option.
     * 
     * @override
     * @return {boolean}
     */
    _allowMultipleValues: function() {
      return this.isMultiple == null || !!this.isMultiple;
    },

    /**
     * When the size option is unspecified,
     * and multiple values are allowed,
     * returns the number of items in the
     * provided possible values list.
     * 
     * @override
     */
    _getListSize: function(values) {
      var size = this.base(values);
      if(size == null) {
        if(!this._allowMultipleValues()) {
          size = values.length;
        } // TODO: otherwise no default... Why?
      }

      return size;
    },

    topIndex: function(_) {
      var $elem = this.placeholder("select");
      var elem = $elem[0];
      
      var L = elem.length;
      if(!L) {return arguments.length ? this : 0;}

      var h  = Math.max(1, elem.scrollHeight);
      var hi = Math.max(1, h / L);

      if(arguments.length) {
        var topIndex = + _ ;
        
        topIndex = isNaN(topIndex) ? 0 : Math.max(0, Math.min(topIndex, L - 1));
        
        $elem.scrollTop(Math.ceil(topIndex * hi));
        
        return this;
      }
      return Math.round($elem.scrollTop() / hi);
    },

    indexOf: function(value) {
      if(value != null) {
        var $options = this.placeholder("select option");
        var L = $options.length;
        if(L) {
          value = String(value);
          for(var i = 0; i < L; i++) {
            if($options[i].value === value) { 
              return i; 
            }
          }
        }
      }
      return -1;
    },

    valueAt: function(index) {
      if(index >= 0) {
        return this.placeholder("select :nth-child(" + (index + 1) + ")").val();
      }
    },

    topValue: function(_) {
      if(arguments.length) {
        var topIndex = this.indexOf(_);
        if(topIndex >= 0) {
          this.topIndex(topIndex);
        }
        return this;
      }
      
      return this.valueAt(this.topIndex());
    }
  });

  return SelectMultiComponent;

});
