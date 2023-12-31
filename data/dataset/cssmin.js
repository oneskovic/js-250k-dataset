'use strict';

module.exports = function(grunt) {
  var helper = require('grunt-lib-contrib').init(grunt);

  grunt.registerMultiTask('cssmin', 'Minify CSS files', function() {
    var options = this.options();
    this.files.forEach(function(f) {
      var max = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .map(grunt.file.read)
      .join(grunt.util.normalizelf(grunt.util.linefeed));

      var min = minifyCSS(max, options);
      if (min.length < 1) {
        grunt.log.warn('Destination not written because minified CSS was empty.');
      } else {
        if ( options.banner ) {
          min = options.banner + grunt.util.linefeed + min;
        }
        grunt.file.write(f.dest, min);
        grunt.log.writeln('File ' + f.dest + ' created.');
        helper.minMaxInfo(min, max);
      }
    });
  });

  var minifyCSS = function(source, options) {
    try {
      return require('clean-css').process(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('css minification failed.');
    }
  };
};
