/* 
 * getFile
 *
 * IN:
 *  args
 *   0 - local filesytem URI for the base directory to search
 *   1 - file to be created/returned; may be absolute path or relative path
 *   2 - options object
 * OUT:
 *  success - FileEntry
 *  fail - FileError code
 */

var resolve = cordova.require('cordova-plugin-file.resolveLocalFileSystemURIProxy');

module.exports = function (success, fail, args) {
    var uri = args[0] === "/" ? "" : args[0] + "/" + args[1],
        options = args[2],
        onSuccess = function (entry) {
            if (typeof(success) === 'function') {
                success(entry);
            }
        },
        onFail = function (code) {
            if (typeof(fail) === 'function') {
                fail(code);
            }
        };
    resolve(function (entry) {
        if (!entry.isFile) {
            onFail(FileError.TYPE_MISMATCH_ERR);
        } else {
            onSuccess(entry);
        }
    }, onFail, [uri, options]);
};
