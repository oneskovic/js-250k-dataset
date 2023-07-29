//dependencies
var path = require('path');

module.exports = function PluginPublicContentControllerModule(pb) {
    
    //PB dependencies
    var util           = pb.util;
    var PluginService  = pb.PluginService;
    var BaseController = pb.BaseController;

    /**
     * Loads files in a plugin's public folder
     * @class PluginPublicContentController
     * @constructor
     * @extends BaseController
     */
    function PluginPublicContentController(){}
    util.inherits(PluginPublicContentController, BaseController);

    /**
     * @see BaseController.render
     * @method render
     * @param {Function} cb
     */
    PluginPublicContentController.prototype.render = function(cb) {
        var plugin          = this.pathVars.plugin;
        var pathParts       = this.req.url.split('/');
        pathParts.splice(0, 3);

        var postPluginPath  = pathParts.join(path.sep);
        var pluginPublicDir = PluginService.getActivePluginPublicDir(plugin);

        //do check for valid strings otherwise serve 404
        if (!util.isString(postPluginPath) || !util.isString(pluginPublicDir)) {
            pb.log.silly('PluginPublicContentController: Invalid public path was provided. POST_PLUGIN_PATH=[%s] PLUGIN_PUBLIC_DIR=[%s] URL=[%s]', postPluginPath, pluginPublicDir, this.req.url);
            this.reqHandler.serve404();
            return;
        }

        //serve up the content
        var resourcePath = path.join(pluginPublicDir, postPluginPath);
        
        //remove qsvars before loading files
        this.reqHandler.servePublicContent(resourcePath.split('?')[0]);
    };

    //exports
    return PluginPublicContentController;
};
