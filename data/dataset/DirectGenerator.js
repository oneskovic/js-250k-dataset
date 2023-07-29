  
  ejs.DirectGenerator = function () {

  
    var
  
    generator = {},
    _common = ejs.DirectSettingsMixin(generator);
    
    return extend(_common, {

      /**
            <p>Sets an analyzer that is applied to each of the tokens passed to 
            this generator.  The analyzer is applied to the original tokens,
            not the generated tokens.</p>

            @member ejs.DirectGenerator
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      preFilter: function (analyzer) {
        if (analyzer == null) {
          return generator.pre_filter;
        }
  
        generator.pre_filter = analyzer;
        return this;
      },
    
      /**
            <p>Sets an analyzer that is applied to each of the generated tokens 
            before they are passed to the actual phrase scorer.</p>

            @member ejs.DirectGenerator
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      postFilter: function (analyzer) {
        if (analyzer == null) {
          return generator.post_filter;
        }
  
        generator.post_filter = analyzer;
        return this;
      },
    
      /**
            <p>Sets the field used to generate suggestions from.</p>

            @member ejs.DirectGenerator
            @param {String} field A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (field) {
        if (field == null) {
          return generator.field;
        }
  
        generator.field = field;
        return this;
      },
    
      /**
            <p>Sets the number of suggestions returned for each token.</p>

            @member ejs.DirectGenerator
            @param {Integer} s A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (s) {
        if (s == null) {
          return generator.size;
        }
  
        generator.size = s;
        return this;
      },

      /**
            The type of ejs object.  For internal use only.
        
            @member ejs.DirectGenerator
            @returns {String} the type of object
            */
      _type: function () {
        return 'generator';
      },
  
      /**
            <p>Retrieves the internal <code>generator</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.DirectGenerator
            @returns {String} returns this object's internal <code>generator</code> property.
            */
      toJSON: function () {
        return generator;
      }
    });
  };
