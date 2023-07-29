  
  ejs.TermFilter = function (fieldName, term) {

    var
      _common = ejs.FilterMixin('term'),
      filter = _common.toJSON();

    filter.term[fieldName] = term;

    return extend(_common, {

      /**
             Provides access to the filter fieldName used to construct the 
             termFilter object.
             
             @member ejs.TermFilter
             @param {String} f the fieldName term
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter fieldName used to construct 
              the termFilter object.
             */
      field: function (f) {
        var oldValue = filter.term[fieldName];
      
        if (f == null) {
          return fieldName;
        }
      
        delete filter.term[fieldName];
        fieldName = f;
        filter.term[fieldName] = oldValue;
      
        return this;
      },

      /**
             Provides access to the filter term used to construct the 
             termFilter object.
             
             @member ejs.TermFilter
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter term used 
              to construct the termFilter object.
             */
      term: function (v) {
        if (v == null) {
          return filter.term[fieldName];
        }
      
        filter.term[fieldName] = v;
        return this;
      }
      
    });
  };
