/* 
 * readEntries
 * 
 * IN:
 *  args
 *   0 - URL of directory to list
 * OUT:
 *  success - Array of Entry objects
 *  fail - FileError
 */

var resolve = cordova.require('cordova-plugin-file.resolveLocalFileSystemURIProxy'),
    info = require('cordova-plugin-file.bb10FileSystemInfo'),
    requestAnimationFrame = cordova.require('cordova-plugin-file.bb10RequestAnimationFrame'),
    createEntryFromNative = cordova.require('cordova-plugin-file.bb10CreateEntryFromNative');

module.exports = function (success, fail, args) {
    var uri = args[0],
        onSuccess = function (data) {
            if (typeof success === 'function') {
                success(data);
            }
        },
        onFail = function (error) {
            if (typeof fail === 'function') {
                if (error.code) {
                    fail(error.code);
                } else {
                    fail(error);
                }
            }
        };
    resolve(function (fs) {
        requestAnimationFrame(function () {
            var reader = fs.nativeEntry.createReader(),
                entries = [],
                readEntries = function() {
                    reader.readEntries(function (results) {
                        if (!results.length) {
                            onSuccess(entries.sort().map(createEntryFromNative));
                        } else {
                            entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                            readEntries();
                        }
                    }, onFail);
                };
            readEntries();
        });
    }, fail, [uri]);
};
