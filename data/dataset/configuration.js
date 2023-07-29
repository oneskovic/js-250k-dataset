//dependencies
var fs = require('fs');

module.exports = function(pb) {
    
    //pb dependencies
    var util = pb.util;
    
    /**
     * Interface for displaying the site's configuration settings
     */
    function Configuration(){}
    util.inherits(Configuration, pb.BaseController);

    //statics
    var SUB_NAV_KEY = 'site_configuration';

    Configuration.prototype.render = function(cb) {
        var self = this;

        pb.settings.get('call_home', function(err, callHome) {
            if(util.isError(err)) {
                self.reqHandler.serveError(err);
                return;
            }

            var config = {
                documentRoot: pb.config.docRoot,
                siteIP: pb.config.siteIP,
                sitePort: pb.config.sitePort,
                dbType: pb.config.db.type,
                dbName: pb.config.db.name,
                dbServers: pb.config.db.servers,
                callHome: callHome || true,
                configSet: fs.existsSync(pb.config.docRoot + '/config.json')
            };

            var angularObjects = pb.ClientJs.getAngularObjects({
                navigation: pb.AdminNavigation.get(self.session, ['settings', 'site_settings'], self.ls),
                pills: pb.AdminSubnavService.get(SUB_NAV_KEY, self.ls, 'configuration'),
                config: config
            });

            self.setPageName(self.ls.get('CONFIGURATION'));
            self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));
            self.ts.load('admin/site_settings/configuration', function(err, result) {
                cb({content: result});
            });
        });
    };

    Configuration.getSubNavItems = function(key, ls, data) {
        return [{
            name: 'configuration',
            title: ls.get('CONFIGURATION'),
            icon: 'refresh',
            href: '/admin/site_settings'
        }, {
            name: 'content',
            title: ls.get('CONTENT'),
            icon: 'quote-right',
            href: '/admin/site_settings/content'
        }, {
            name: 'email',
            title: ls.get('EMAIL'),
            icon: 'envelope',
            href: '/admin/site_settings/email'
        }, {
            name: 'libraries',
            title: ls.get('LIBRARIES'),
            icon: 'book',
            href: '/admin/site_settings/libraries'
        }];
    };

    //register admin sub-nav
    pb.AdminSubnavService.registerFor(SUB_NAV_KEY, Configuration.getSubNavItems);

    //exports
    return Configuration;
};
