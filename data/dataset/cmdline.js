var command = require("commander"),
    logger = require("./logger"),
    localize = require("./localize");

command
    .version('1.0.0.0')
    .usage('[drive:][path]archive [-s [dir]] [[ -g genpassword] [-buildId num]] [-o dir] [-d] [-p paramsjsonfile]')
    .option('-s, --source [dir]', 'Save source. The default behaviour is to not save the source files. If dir is specified then creates dir\\src\\ directory structure. If no dir specified then the path of archive is assumed')
    .option('-g, --password <password>', 'Signing key password')
    .option('-buildId <num>', '[deprecated] Use --buildId.')
    .option('-b, --buildId <num>', 'Specifies the build number for signing (typically incremented from previous signing).')
    .option('-o, --output <dir>', 'Redirects output file location to dir. If both -o and dir are not specified then the path of archive is assumed')
    .option('-d, --debug', 'Allows use of not signed build on device by utilizing debug token and enables Web Inspector.')
    .option('-p, --params <params JSON file>', 'Specifies additional parameters to pass to downstream tools.')
    .option('-v, --verbose', 'Turn on verbose messages');

function parseArgs(args) {
    var option,
        i;
    if (!args[2]) {
        //no args passed into [node bbwp.js], show the help information
        args.push("-h");
    }

    //Handle deprecated option -buildId
    for (i = 0; i < args.length; i++) {
        if (args[i] === "-buildId") {
            args[i] = "--buildId";
        }
    }
    
    command.parse(args);

    //Check for any invalid command line args
    for (i = 0; i < args.length; i++) {
        //Remove leading dashes if any
        option = args[i].substring(2);
        if (args[i].indexOf("--") === 0 && !command[option]) {
            throw localize.translate("EXCEPTION_CMDLINE_ARG_INVALID", args[i]);
        }
    }

    return this;
}

module.exports = {
    "commander": command,
    "parse": parseArgs
};
