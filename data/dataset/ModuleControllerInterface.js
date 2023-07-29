var Aria = require("../../Aria");
var ariaTemplatesIModuleCtrl = require("../../templates/IModuleCtrl");


/**
 * Public API of the runner module
 * @class aria.tester.runner.ModuleControllerInterface
 */
module.exports = Aria.interfaceDefinition({
    $classpath : 'aria.tester.runner.ModuleControllerInterface',
    $extends : ariaTemplatesIModuleCtrl,
    $events : {
        "initSuccessful" : "initSuccessful",
        "preloadEnd" : "preloadEnd",
        "testEnd" : "testEnd",
        "testStateChange" : "testStateChange"
    },
    $interface : {
        "startCampaign" : {
            $type : "Function",
            $callbackParam : 0
        },

        "preloadSuites" : {
            $type : "Function",
            $callbackParam : 0
        },

        "updateTests" : {
            $type : "Function",
            $callbackParam : 0
        },

        "reload" : {
            $type : "Function",
            $callbackParam : 0
        },

        "switchView" : {
            $type : "Function",
            $callbackParam : 0
        },

        "pauseCampaign" : {
            $type : "Function",
            $callbackParam : 0
        },

        "resumeCampaign" : {
            $type : "Function",
            $callbackParam : 0
        }
    }
});
