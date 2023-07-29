module.exports = function(pb) {
    
    //pb dependencies
    var util = pb.util;
    
    /**
     * Interface for the site's libraries settings
     */
    function Libraries(){}
    util.inherits(Libraries, pb.BaseController);

    //statics
    var SUB_NAV_KEY = 'libraries_settings';

    Libraries.prototype.render = function(cb) {
        var self = this;

        var tabs =
        [
            {
                active: 'active',
                href: '#css',
                icon: 'css3',
                title: 'CSS'
            },
            {
                href: '#javascript',
                icon: 'eject fa-rotate-90',
                title: 'JavaScript'
            }
        ];

        var librariesService = new pb.LibrariesService();
        librariesService.getSettings(function(err, librarySettings) {
            var angularObjects = pb.ClientJs.getAngularObjects({
                navigation: pb.AdminNavigation.get(self.session, ['settings', 'site_settings'], self.ls),
                pills: pb.AdminSubnavService.get(SUB_NAV_KEY, self.ls, 'libraries'),
                tabs: tabs,
                librarySettings: librarySettings,
                cdnDefaults: pb.LibrariesService.getCDNDefaults(),
                bowerDefaults: pb.LibrariesService.getBowerDefaults()
            });

            self.setPageName(self.ls.get('LIBRARIES'));
            self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));
            self.ts.load('admin/site_settings/libraries', function(err, result) {
                cb({content: result});
            });
        });
    };


    Libraries.getSubNavItems = function(key, ls, data) {
        return [{
            name: 'configuration',
            title: ls.get('LIBRARIES'),
            icon: 'chevron-left',
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
        }];
    };

    //register admin sub-nav
    pb.AdminSubnavService.registerFor(SUB_NAV_KEY, Libraries.getSubNavItems);

    //exports
    return Libraries;
};
