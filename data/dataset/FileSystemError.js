/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define */

/**
 * FileSystemError describes the errors that can occur when using the FileSystem, File,
 * and Directory modules.
 *
 * Error values are strings. Any "falsy" value: null, undefined or "" means "no error".
 */
define(function (require, exports, module) {
    "use strict";

    /**
     * Enumerated File System Errors
     * @enum {string}
     */
    module.exports = {
        UNKNOWN                     : "Unknown",
        INVALID_PARAMS              : "InvalidParams",
        NOT_FOUND                   : "NotFound",
        NOT_READABLE                : "NotReadable",
        UNSUPPORTED_ENCODING        : "UnsupportedEncoding",
        NOT_SUPPORTED               : "NotSupported",
        NOT_WRITABLE                : "NotWritable",
        OUT_OF_SPACE                : "OutOfSpace",
        TOO_MANY_ENTRIES            : "TooManyEntries",
        ALREADY_EXISTS              : "AlreadyExists",
        CONTENTS_MODIFIED           : "ContentsModified",
        ROOT_NOT_WATCHED            : "RootNotBeingWatched",
        EXCEEDS_MAX_FILE_SIZE       : "ExceedsMaxFileSize",
        NETWORK_DRIVE_NOT_SUPPORTED : "NetworkDriveNotSupported"

        // FUTURE: Add remote connection errors: timeout, not logged in, connection err, etc.
    };
});
