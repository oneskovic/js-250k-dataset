/*global require, console, runtime, core*/

runtime.loadClass("core.Zip");

var directory = process.argv[3], // path of the directory to zip
    zipfile = process.argv[4], // path of the zip file to create
    notopdir = (process.argv[5] === "notopdir"), // flag if the toplevel dir should be dropped in the path in the zip entries
    prefixpath = process.argv[6] || ""; // prefix path to add to the path in the zip entries

function zipdirectory(zipfile, directory, notopdir, prefixpath) {
    "use strict";
    var fs = require('fs'),
        path = require('path'),
        stat,
        list;
    function listFiles(directory, basename, list) {
        var l = fs.readdirSync(directory),
            i;
        l.forEach(function (f) {
            var abspath = path.join(directory, f),
                relpath = path.join(basename, f),
                stat = fs.lstatSync(abspath);
            if (stat.isDirectory(abspath)) {
                listFiles(abspath, relpath, list);
            } else {
                list.push(relpath);
            }
        });
    }
    function zipFile(zip, abspath, relpath) {
        var entry = {}, data;
        entry.path = relpath;
        entry.date = new Date();
        runtime.log(abspath);
        data = runtime.readFileSync(abspath, "binary");
        runtime.log("[" + zipfile + "] << \"" + entry.path + "\"");
        zip.save(entry.path, data, false, entry.date);
    }
    function zipList(base, zipfilepath, list) {
        var zip = new core.Zip(zipfilepath, null),
            i;
        for (i = 0; i < list.length; i += 1) {
            zipFile(zip, path.join(base, list[i]), path.join(prefixpath, list[i]));
        }
        zip.write(function (err) {
            if (err) {
                runtime.log(err);
            }
        });
    }

    if (!fs.existsSync(directory)) {
        throw "Directory " + directory + " does not exist.";
    }
    stat = fs.lstatSync(directory);
    if (!stat.isDirectory()) {
        throw directory + " is not a directory.";
    }
    list = [];
    if (notopdir) {
        listFiles(directory, "", list);
    } else {
        listFiles(directory, path.basename(directory), list);
    }
    runtime.log(list);
    if (list.length === 0) {
        throw "Directory " + directory + " is empty.";
    }
    if (fs.existsSync(zipfile)) {
        runtime.log("Deleting " + zipfile);
        fs.unlinkSync(zipfile);
    }
    if (notopdir) {
        zipList(directory, zipfile, list);
    } else {
        zipList(path.dirname(directory), zipfile, list);
    }
    runtime.log("Created " + zipfile);
}
zipdirectory(zipfile, directory, notopdir, prefixpath);
