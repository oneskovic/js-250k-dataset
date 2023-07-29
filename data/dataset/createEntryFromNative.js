/*
 * createEntryFromNative
 * 
 * IN
 *  native - webkit Entry
 * OUT
 *  returns Cordova entry
 */

var info = require('cordova-plugin-file.bb10FileSystemInfo'),
    fileSystems = require('cordova-plugin-file.fileSystems');

module.exports = function (native) {
    var entry = {
            nativeEntry: native,
            isDirectory: !!native.isDirectory,
            isFile: !!native.isFile,
            name: native.name,
            fullPath: native.fullPath,
            filesystemName: native.filesystem.name,
            nativeURL: native.toURL()
        },
        persistentPath = info.persistentPath.substring(7),
        temporaryPath = info.temporaryPath.substring(7);
    //fix bb10 webkit incorrect nativeURL
    if (native.filesystem.name === 'root') {
        entry.nativeURL = 'file:///' + native.fullPath;
    } else if (entry.nativeURL.indexOf('filesystem:local:///persistent/') === 0) {
        entry.nativeURL = info.persistentPath + native.fullPath;
    } else if (entry.nativeURL.indexOf('filesystem:local:///temporary') === 0) {
        entry.nativeURL = info.temporaryPath + native.fullPath;
    }
    //translate file system name from bb10 webkit
    if (entry.filesystemName === 'local__0:Persistent' || entry.fullPath.indexOf(persistentPath) !== -1) {
        entry.filesystemName = 'persistent';
    } else if (entry.filesystemName === 'local__0:Temporary' || entry.fullPath.indexOf(temporaryPath) !== -1) {
        entry.filesystemName = 'temporary';
    }
    //add file system property (will be called sync)
    fileSystems.getFs(entry.filesystemName, function (fs) {
        entry.filesystem = fs;
    });
    //set root on fullPath for persistent / temporary locations
    entry.fullPath = entry.fullPath.replace(persistentPath, "");
    entry.fullPath = entry.fullPath.replace(temporaryPath, "");
    //set trailing slash on directory
    if (entry.isDirectory && entry.fullPath.substring(entry.fullPath.length - 1) !== '/') {
        entry.fullPath += '/';
    }
    if (entry.isDirectory && entry.nativeURL.substring(entry.nativeURL.length - 1) !== '/') {
        entry.nativeURL += '/';
    }
    //encode URL
    entry.nativeURL = window.encodeURI(entry.nativeURL);
    return entry;
};
