var wrench = require("wrench"),
    fs = require("fs"),
    path = require("path"),
    _c = require("./conf"),
    pp = require("./preprocessor");

module.exports = function (preprocessDefs, paths) {
    return  function (prev, baton) {
        var files = [];

        baton.take();
        //get list of files that need to be precompiled
        function collect(dir, files) {
            if (fs.statSync(dir).isDirectory()) {
                fs.readdirSync(dir).forEach(function (item) {
                    collect(path.join(dir, item), files);
                });
            } else if (dir.match(/\.js$/)) {
                files.push(dir);
            }
        }
        if (!paths) {
            collect(_c.DEPLOY_LIB, files);
            collect(_c.DEPLOY_EXT, files);
        } else {
            paths.forEach(function (path) {
                collect(path, files);
            });
        }
        files.forEach(function (file) {
            //fork and start a node process and produce the output file.
            file = path.normalize(file);
            var temp = file + "-temp",
                fileBuffer,
                options = {
                    defines: preprocessDefs,
                    src: file,
                    dst: temp
                };

            pp.preprocess(options);

            fileBuffer = fs.readFileSync(temp);

            fs.writeFileSync(file, fileBuffer);

            fs.unlinkSync(temp);
        });

        baton.pass();
    };
};
