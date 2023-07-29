var Analyzer = Fiber.extend(function() {

  return {
    /**
     * analyzer initialization
     * @constructs Analyzer
     */
    init: function() {},
    
    /**
     * Clean up moduleIds by removing all buildin modules
     * (requie, exports, module) from a given module list
     * @method Analyzer.stripBuiltins
     * @param {Array} modules - a dirty list of modules
     * @public
     * @returns {Array} a clean list of modules without buildins
     */

    stripBuiltins: function(modules) {

      var strippedModuleList = [],
          len = modules.length,
          i = 0;

      for (i; i < len; i++) {
        //modules[i] is the moduleId
        if (!BUILTINS[modules[i]]) {
          strippedModuleList.push(modules[i]);
        }
      }
      return strippedModuleList;
    },

    
    /**
     * Extract the clean dependency requires from a given file as
     * String, remove all buildin requires, merge requires from
     * AMD define purpose
     * @method Analyzer.extractRequires
     * @param {String} file - a string of a file
     * @public
     * @returns {Array} a clean list of dependency requires from a
     * module file
     */
    extractRequires: function(file) {
      /*jshint boss:true */

      var dependencies = [],
          dependencyCache = {
            require: 1,
            module: 1,
            exports: 1
          },
          item,
          term,
          dep;

      if (!file) {
        return [];
      }

      file = file.replace(JS_COMMENTS_REGEX, '');

      while (item = REQUIRE_REGEX.exec(file)) {
        dep = item[1];
        if (!dependencyCache[dep]) {
          dependencyCache[dep] = 1;
          dependencies.push(dep);
        }
      }
      
      while (item = DEFINE_REGEX.exec(file)) {
        while (term = DEFINE_TERM_REGEX.exec(item[1])) {
          dep = term[1];
          if (!dependencyCache[dep]) {
            dependencyCache[dep] = 1;
            dependencies.push(dep);
          }
        }
      }
      
      return dependencies;
    }
  };
});
