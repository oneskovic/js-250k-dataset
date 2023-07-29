var Aria = require("../../../Aria");
require("./RequestHandlerCfgBeans");
var ariaCoreEnvironmentEnvironmentBase = require("../../../core/environment/EnvironmentBase");
var ariaUtilsJson = require("../../../utils/Json");


/**
 * Public API for retrieving, applying application variables.
 * @class aria.modules.requestHandler.environment.RequestHandler
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.modules.requestHandler.environment.RequestHandler",
    $singleton : true,
    $extends : ariaCoreEnvironmentEnvironmentBase,
    $prototype : {
        /**
         * Classpath of the bean which allows to validate the part of the environment managed by this class.
         * @type String
         */
        _cfgPackage : "aria.modules.requestHandler.environment.RequestHandlerCfgBeans.AppCfg",

        /**
         * Get the urlService classpath configuration. It is a copy of the current configuration and not a reference to
         * the object itself.
         * @public
         * @return {aria.modules.requestHandler.environment.RequestHandlerCfgBeans:AppCfg} The classpath configuration
         */
        getRequestHandlerCfg : function () {
            return ariaUtilsJson.copy(this.checkApplicationSettings("requestHandler"));
        },

        /**
         * Get the requestJsonSerializer configuration. It is the current configuration
         * @public
         * @return {aria.modules.requestHandler.environment.RequestHandlerCfgBeans:RequestJsonSerializerCfg} The JSON
         * serializer configuration
         */
        getRequestJsonSerializerCfg : function () {
            return this.checkApplicationSettings("requestJsonSerializer");
        }
    }
});
