/* 
 * getParent
 *
 * IN:
 *  args
 *   0 - local filesytem URI
 * OUT:
 *  success - DirectoryEntry of parent
 *  fail - FileError code
 */

var resolve = cordova.require('org.apache.cordova.file.resolveLocalFileSystemURIProxy'),
    requestAnimationFrame = cordova.require('org.apache.cordova.file.bb10RequestAnimationFrame');

module.exports = function (success, fail, args) {
    var uri = args[0],
        onSuccess = function (entry) {
            if (typeof(success) === 'function') {
                success(entry);
            }
        },
        onFail = function (error) {
            if (typeof(fail) === 'function') {
                if (error && error.code) {
                    fail(error.code);
                } else {
                    fail(error);
                }
            }
        };
    resolve(function (entry) {
        requestAnimationFrame(function () {
            entry.nativeEntry.getParent(onSuccess, onFail);
        });
    }, onFail, [uri]);
};
