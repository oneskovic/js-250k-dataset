var Aria = require("../../../Aria");
var ariaCoreJsonTypes = require("../../../core/JsonTypes");
var ariaCoreEnvironmentEnvironmentBaseCfgBeans = require("../../../core/environment/EnvironmentBaseCfgBeans");


/**
 * Bean definition containing default settings for the ContextualMenu environment.
 */
module.exports = Aria.beanDefinitions({
    $package : "aria.tools.contextual.environment.ContextualMenuCfgBeans",
    $description : "A definition of the JSON beans used to set the environment settings.",
    $namespaces : {
        "json" : ariaCoreJsonTypes,
        "environmentBase" : ariaCoreEnvironmentEnvironmentBaseCfgBeans
    },
    $beans : {
        "AppCfg" : {
            $type : "json:Object",
            $description : "Application environment variables",
            $restricted : false,
            $properties : {
                "contextualMenu" : {
                    $type : "ContextualMenuCfg",
                    $default : {}
                }
            }
        },

        "ContextualMenuCfg" : {
            $type : "json:Object",
            $description : "Settings related to the contextual menu.",
            $properties : {
                "enabled" : {
                    $type : "json:Boolean",
                    $description : "Control whether the contextual menu is enabled or disabled.",
                    $default : Aria.debug
                },
                "template" : {
                    $type : "json:PackageName",
                    $description : "Classpath of the template used inside the contextual menu.",
                    $default : "aria.tools.contextual.ContextualDisplay"
                },
                "moduleCtrl" : {
                    $type : "json:PackageName",
                    $description : "Classpath of the module controller used inside the contextual menu.",
                    $default : "aria.tools.contextual.ContextualModule"
                }
            }
        }
    }
});
