

(function ($) {

    // Patch collection fetching to emit a `fetch` event.
    Backbone.Collection.prototype.fetch = function () {
        var fetch = Backbone.Collection.prototype.fetch;

        return function () {
            this.trigger("fetch");

            return fetch.apply(this, arguments);
        };
    } ();

//    var pageListView = new PageListView();

//    var Router = Backbone.Router.extend({

//        routes: {},

//        // set up routing table
//        initialize: function () {

//            var router = this,

//                routes = [
//                    ['', 'ui', this.ui],
//                    ['dashboard/', 'dashboard', this.dashboard],
//                    [/^pages\/((?!(.*?)\w*new).*)$/, 'pages', this.pages]
//                ];

//            $(routes).each(function (index, route) {
//                router.route.apply(router, route);
//            });

//        },
//        ui: function () {

//            console.log('ui');
//            var route = this;
//            var ui = new UiView();

//        },
//        dashboard: function () {

//            var route = this;
//            var dashboard = new DashboardView();

//        },
//        pages: function (url) {

//            var route = this;

//            console.log('pages: ' + url);

//            pageListView.url = url;
//            pageListView.render();

//        }
//    });

    // Shorthand the application namespace
    //var app = brickpile.app;

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
//    app.router = new Router();

    // Set selected class on the main navigation
//    app.router.bind('all ', function (route, section) {
//        var $el;
//        route = route.replace('route:', '');

//        $el = $('nav a.' + route);

//        // If current route is highlighted, we're done.
//        if ($el.hasClass('selected')) {
//            return;
//        } else {
//            // Unhighlight active tab.
//            $('nav a.selected').removeClass('selected');
//            // Highlight active page tab.
//            $el.addClass('selected');
//        }
//    });

    // Trigger the initial route and enable HTML5 History API support
//    Backbone.history.start({ pushState: true });

    

    // Ensure that we have a valid slug
    //$('.slug').slugify('input.title');

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
//    $(document).on("click", "a:not([data-bypass])", function (evt) {
//        // Get the anchor href and protcol
//        var href = $(this).attr("href");
//        var protocol = this.protocol + "//";

//        // Ensure the protocol is not part of URL, meaning its relative.
//        if (href && href.slice(0, protocol.length) !== protocol) {
//            // Stop the default event to ensure the link will not cause a page
//            // refresh.
//            evt.preventDefault();

//            // This uses the default router defined above, and not any routers
//            // that may be placed in modules.  To have this work globally (at the
//            // cost of losing all route events) you can change the following line
//            // to: Backbone.history.navigate(href, true);
//            app.router.navigate(href, true);
//        }
//    });

})(jQuery);    
    
