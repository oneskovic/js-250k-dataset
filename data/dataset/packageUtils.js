(function() {
  var UglifyJS, fs, fsExtra, packageUtils, path;

  fsExtra = require('fs-extra');

  fs = require('fs');

  UglifyJS = require('uglify-js');

  path = require('path');

  packageUtils = module.exports;

  packageUtils.isNative = function(module) {
    var err;
    try {
      return require.resolve(module) === module;
    } catch (_error) {
      err = _error;
      return false;
    }
  };

  packageUtils.readFile = function(pathAbs, encoding) {
    var options;
    if (encoding == null) {
      encoding = 'utf8';
    }
    options = {
      encoding: encoding
    };
    return fs.readFileSync(pathAbs, options);
  };

  packageUtils.getAst = function(code) {
    return UglifyJS.parse(code);
  };

  packageUtils.getRequireStatements = function(ast, file, possibleExtensions, isOnlyNonNativeNonNpm) {
    var fileDir, r;
    if (possibleExtensions == null) {
      possibleExtensions = ["js", "coffee"];
    }
    if (isOnlyNonNativeNonNpm == null) {
      isOnlyNonNativeNonNpm = true;
    }
    r = [];
    fileDir = path.dirname(file);
    ast.walk(new UglifyJS.TreeWalker(function(node) {
      var args, existingExtensions, pathOfModule, pathOfModuleLoc, pathOfModuleLocDir, pathOfModuleRaw, rs, text;
      if ((node instanceof UglifyJS.AST_Call) && node.start.value === 'require') {
        text = node.print_to_string({
          beautify: true
        });
        args = node.args;
        if (args.length !== 1) {
          throw new Error("in file: " + file + " require supposed to have 1 argument: " + text);
        }
        pathOfModuleRaw = args[0].value;
        pathOfModuleLoc = path.resolve(fileDir, pathOfModuleRaw);
        pathOfModuleLocDir = path.dirname(pathOfModuleLoc);
        if (pathOfModuleLoc === pathOfModuleLocDir) {
          throw new Error("in file: " + file + " require for a directory not supported " + text);
        }
        if (path.extname(pathOfModuleLoc) === "") {
          existingExtensions = possibleExtensions.filter(function(ext) {
            return fs.existsSync(pathOfModuleLoc + "." + ext);
          });
          if (existingExtensions.length > 1) {
            throw new Error("in file: " + file + " multiple matching extensions problem for " + text);
          }
          pathOfModule = existingExtensions.length === 1 ? pathOfModuleLoc + "." + existingExtensions[0] : null;
        } else {
          pathOfModule = fs.existsSync(pathOfModuleLoc) ? pathOfModuleLoc : null;
        }
        rs = {
          text: text,
          path: pathOfModule
        };
        if (!isOnlyNonNativeNonNpm || pathOfModule) {
          r.push(rs);
        }
        return true;
      } else {

      }
    }));
    return r;
  };

}).call(this);

//# sourceMappingURL=packageUtils.map
