var fluid_2_0 = fluid_2_0 || {};

(function (fluid) {
    "use strict";

    fluid.registerNamespace("fluid.uploader");

    fluid.uploader.mimeTypeRegistry = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        bmp: "image/bmp",
        png: "image/png",
        tif: "image/tiff",
        tiff: "image/tiff",

        // Audio
        mp3: "audio/mpeg",
        m4a: "audio/mp4a-latm",
        ogg: "audio/ogg",
        wav: "audio/x-wav",
        aiff: "audio/x-aiff",

        // Video
        mpg: "video/mpeg",
        mpeg: "video/mpeg",
        m4v: "video/x-m4v",
        ogv: "video/ogg",
        mov: "video/quicktime",
        avi: "video/x-msvideo",

        // Text documents
        html: "text/html",
        htm: "text/html",
        text: "text/plain",

        // Office Docs.
        doc: "application/msword",
        docx: "application/msword",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.ms-excel",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.ms-powerpoint"
    };
})(fluid_2_0);