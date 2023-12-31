({

  baseUrl: './',

  mainConfigFile: 'common/js/nooline/start.js',

  optimize: 'uglify2',

  uglify2: {
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      unsafe: true,
      conditionals: true,
      comparisons: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      hoist_vars: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      negate_iife: true
    }
  },

  optimizeCss: 'standard',

  useStrict: true,

  findNestedDependencies: true,

  locale: 'en-us',

  dir: './production',

  modules: [
    {
      name: 'common/js/nooline/start'
    }
  ],

  onBuildRead: function (moduleName, path, contents) {

    // Remove CJS requires.
    return contents.replace(/require\('.+'\)/g, null);
  },

  fileExclusionRegExp: /^\.|controllers|logs|routes|\.json/

})
