require('./../third_party/wrench/wrench');

var path = require("path"),
    wrench = require("wrench"),
    cmdline = require("./cmdline"),
    logger = require("./logger"),
    fileManager = require("./file-manager"),
    localize = require("./localize"),
    configParser = require("./config-parser"),
    packagerUtils = require("./packager-utils"),
    packagerValidator = require("./packager-validator"),
    barBuilder = require("./bar-builder"),
    extManager,
    session;

try {
    cmdline.parse(process.argv);
    session = require("./session").initialize(cmdline.commander);
    extManager = require("./extension-manager").initialize(session);

    //prepare files for webworks archiving
    logger.info(localize.translate("PROGRESS_FILE_POPULATING_SOURCE"));
    fileManager.prepareOutputFiles(session);

    //parse config.xml
    logger.info(localize.translate("PROGRESS_SESSION_CONFIGXML"));
    configParser.parse(path.join(session.sourceDir, "config.xml"), session, extManager, function (configObj) {
        //validate session Object
        packagerValidator.validateSession(session, configObj);
        //validage configuration object
        packagerValidator.validateConfig(session, configObj, extManager);

        //generate user.js
        logger.info(localize.translate("PROGRESS_GEN_OUTPUT"));
        //Adding debuEnabled property to user.js. Framework will enable/disable WebInspector based on that variable.
        configObj.debugEnabled = session.debug;
        packagerUtils.writeFile(path.join(session.sourcePaths.LIB, "config"), "user.js", "module.exports = " + JSON.stringify(configObj, null, "    ") + ";");
        //Write manifest map at lib/manifest.js for extensions to reference each other
        packagerUtils.writeFile(session.sourcePaths.LIB, "manifest.js", "module.exports = " + JSON.stringify(extManager.getExtensionMap(), null, "    ") + ";");

        barBuilder.build(session, configObj, extManager, function (code) {
            fileManager.cleanSource(session);

            if (code === 0) {
                logger.info(localize.translate("PROGRESS_COMPLETE"));
            }
        });
    });
} catch (e) {
    try {
        fileManager.cleanSource(session);
    } catch (e) {}

    logger.error(e);
}
