define("resolver",
  [],
  function() {
    "use strict";
  

  function classFactory(klass) {
    return {
      create: function (injections) {
        if (typeof klass.extend === 'function') {
          return klass.extend(injections);
        } else {
          return klass;
        }
      }
    };
  }

  var underscore = Ember.String.underscore;
  var classify = Ember.String.classify;
  var get = Ember.get;

  function parseName(fullName) {
    var nameParts = fullName.split(":"),
        type = nameParts[0], fullNameWithoutType = nameParts[1],
        name = fullNameWithoutType,
        namespace = get(this, 'namespace'),
        root = namespace;

    return {
      fullName: fullName,
      type: type,
      fullNameWithoutType: fullNameWithoutType,
      name: name,
      root: root,
      resolveMethodName: "resolve" + classify(type)
    };
  }

  function chooseModuleName(seen, moduleName) {
    var underscoredModuleName = Ember.String.underscore(moduleName);

    if (moduleName !== underscoredModuleName && seen[moduleName] && seen[underscoredModuleName]) {
      throw new TypeError("Ambigous module names: `" + moduleName + "` and `" + underscoredModuleName + "`");
    }

    if (seen[moduleName]) {
      return moduleName;
    } else if (seen[underscoredModuleName]) {
      return underscoredModuleName;
    } else {
      return moduleName;
    }
  }

  function resolveRouter(parsedName) {
    var prefix = this.namespace.modulePrefix;
    if (parsedName.fullName === 'router:main') {
      // for now, lets keep the router at app/router.js
      if (requirejs._eak_seen[prefix + '/router']) {
        return require(prefix + '/router');
      }
    }
  }

  function resolveOther(parsedName) {
    var prefix = this.namespace.modulePrefix;
    Ember.assert('module prefix must be defined', prefix);

    var pluralizedType = parsedName.type + 's';
    var name = parsedName.fullNameWithoutType;

    var moduleName = prefix + '/' +  pluralizedType + '/' + name;

    // allow treat all dashed and all underscored as the same thing
    // supports components with dashes and other stuff with underscores.
    var normalizedModuleName = chooseModuleName(requirejs._eak_seen, moduleName);

    if (requirejs._eak_seen[normalizedModuleName]) {
      var module = require(normalizedModuleName, null, null, true /* force sync */);

      if (module === undefined) {
        throw new Error(" Expected to find: '" + parsedName.fullName + "' within '" + normalizedModuleName + "' but got 'undefined'. Did you forget to `export default` within '" + normalizedModuleName + "'?");
      }

      if (this.shouldWrapInClassFactory(module, parsedName)) {
        module = classFactory(module);
      }

      if (Ember.ENV.LOG_MODULE_RESOLVER) {
        Ember.Logger.info('hit', moduleName);
      }

      return module;
    } else {
      if (Ember.ENV.LOG_MODULE_RESOLVER) {
        Ember.Logger.info('miss', moduleName);
      }
      return this._super(parsedName);
    }
  }
  // Ember.DefaultResolver docs:
  //   https://github.com/emberjs/ember.js/blob/master/packages/ember-application/lib/system/resolver.js
  var Resolver = Ember.DefaultResolver.extend({
    resolveTemplate: resolveOther,
    resolveOther: resolveOther,
    resolveRouter: resolveRouter,
    parseName: parseName,
    shouldWrapInClassFactory: function(module, parsedName){
      return false;
    },
    normalize: function(fullName) {
      // replace `.` with `/` in order to make nested controllers work in the following cases
      // 1. `needs: ['posts/post']`
      // 2. `{{render "posts/post"}}`
      // 3. `this.render('posts/post')` from Route
      return Ember.String.dasherize(fullName.replace(/\./g, '/'));
    }
  });

  return Resolver;
});
