module.exports = function () {
    var util = require('util'),
        libs = [],
        tests = [],
        total_lines = 0,
        total_loc = 0,
        lib_loc = 0,
        lib_lines = 0,
        test_loc = 0,
        test_lines = 0,
        emptySpace,
        testsOverLib;

    function spaces(number) {
        var str = "", i;
        for (i = 0; i < number; i++) {
            str += " ";
        }
        return str;
    }

    function parseFile(file, callback) {
        var lines = 0,
            loc = 0;

        if (file.match(/\.js$/)) {
            // hack!
            require('fs').readFileSync(file, "utf-8").replace(/\n$/, '').split("\n").forEach(function (line) {
                lines++;
                if (line !== "" && !line.match(/^\s*(\/\/.*)?$/)) {
                    loc++;
                }
            });

            file = file.replace(/\.js$/, '')
                        .replace(/^.*lib\/ripple$/, 'ripple')
                        .replace(/^.*lib\/ripple\/?/, '')
                        .replace(/^.*test\//, '');

            util.puts("| " + file + spaces(59 - file.length) + "| " +
                    lines + spaces(7 - String(lines).length) + "| " +
                    loc + spaces(7 - String(loc).length) + "|");

            callback(lines, loc);
        }
    }

    function collect(path, files) {
        var fs = require('fs');
        if (fs.statSync(path).isDirectory()) {
            fs.readdirSync(path).forEach(function (item) {
                collect(require('path').join(path, item), files);
            });
        } else if (path.match(/\.js$/)) {
            files.push(path);
        }
    }

    collect(__dirname + "/../lib/", libs);
    collect(__dirname + "/../test/", tests);

    libs.sort();
    tests.sort();

    util.puts("+------------------------------------------------------------+--------+--------+");
    util.puts("| Lib                                                        | Lines  | LOC    |");
    util.puts("+------------------------------------------------------------+--------+--------+");

    libs.forEach(function (lib) {
        parseFile(lib, function (lines, loc) {
            lib_lines += lines;
            lib_loc += loc;
        });
    });

    util.puts("+------------------------------------------------------------+--------+--------+");
    util.print("| Total                                                      |");
    util.print(" " + lib_lines + spaces(7 - String(lib_lines).length) + "|");
    util.puts(" " + lib_loc + spaces(7 - String(lib_loc).length) + "|");
    util.puts("+------------------------------------------------------------+--------+--------+");

    util.puts("+------------------------------------------------------------+--------+--------+");
    util.puts("| Tests                                                      | Lines  | LOC    |");
    util.puts("+------------------------------------------------------------+--------+--------+");

    tests.forEach(function (test) {
        parseFile(test, function (lines, loc) {
            test_lines += lines;
            test_loc += loc;
        });
    });

    util.puts("+------------------------------------------------------------+--------+--------+");
    util.print("| Total                                                      |");
    util.print(" " + test_lines + spaces(7 - String(test_lines).length) + "|");
    util.puts(" " + test_loc + spaces(7 - String(test_loc).length) + "|");
    util.puts("+------------------------------------------------------------+--------+--------+");

    total_lines = lib_lines + test_lines;
    total_loc = lib_loc + test_loc;
    testsOverLib = (lib_loc / test_loc).toFixed(2);
    emptySpace = total_lines - total_loc;

    util.puts("+------------------------------------------------------------+--------+--------+");
    util.puts("| Stats                                                                        |");
    util.puts("+------------------------------------------------------------+--------+--------+");
    util.puts("| lines: " + total_lines + spaces(70 - String(total_lines).length) + "|");
    util.puts("| loc: " + total_loc + spaces(72 - String(total_loc).length) + "|");
    util.puts("| lib/test (loc): " + testsOverLib + spaces(61 - String(testsOverLib).length) + "|");
    util.puts("| comments & empty space: " + emptySpace + spaces(53 - String(emptySpace).length) + "|");
    util.puts("+------------------------------------------------------------+--------+--------+");
};
