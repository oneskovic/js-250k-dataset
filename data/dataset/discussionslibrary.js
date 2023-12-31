define(['jquery', 'oae.core', 'jquery.history'], function($, oae) {

    return function(uid, showSettings, widgetData) {

        // The widget container
        var $rootel = $('#' + uid);

        // Variable that will be used to keep track of the current infinite scroll instance
        var infinityScroll = false;

        /**
         * Initialize a new infinite scroll container that fetches a discussion library.
         * This will detect when a search is happening and will change the endpoint
         * accordingly.
         */
        var getDiscussionsLibrary = function() {
            // Disable the previous infinite scroll
            if (infinityScroll) {
                infinityScroll.kill();
            }

            // Detect whether or not we need to do a search by checking if
            // the History.js state has a query parameter
            var query = History.getState().data.query;
            $('#oae-list-header-search-query', $rootel).val(query);

            // Set up the list actions
            var initialContent = null;
            if ((widgetData.canAdd || widgetData.canManage) && !query) {
                initialContent = oae.api.util.template().render($('#discussionslibrary-list-actions-template', $rootel));
            }

            var url = '/api/discussion/library/' + widgetData.context.id;
            if (query) {
                url = '/api/search/discussion-library/' + widgetData.context.id;
            }

            // Set up the infinite scroll for the discussions library
            infinityScroll = $('.oae-list', $rootel).infiniteScroll(url, {
                'limit': 12,
                'q': query
            }, '#discussionslibrary-template', {
                'initialContent': initialContent,
                'postProcessor': function(data) {
                    // Let the template know whether or not the current list
                    // is a main list or a search list, as different paging
                    // keys need to be provided for each
                    data.query = query;
                    data.displayOptions = {
                        'showCheckbox': true
                    };
                    return data;
                },
                'emptyListProcessor': function() {
                    oae.api.util.template().render($('#discussionslibrary-noresults-template', $rootel), {
                        'query': query
                    }, $('.oae-list', $rootel));
                }
            });
        };

        /**
         * If the current user is an anonymous user, we don't show any actions. If the user
         * is logged in, we render the list of available actions based on whether or not the
         * user can manage this library.
         */
        var setUpListHeader = function() {
            // Determine which list header actions should be available to the user viewing the library
            var listHeaderActions = [];
            if (!oae.data.me.anon) {
                // If the user is logged in, they have the option to share the items
                listHeaderActions.push({
                    'icon': 'fa-share-square-o',
                    'label': oae.api.i18n.translate('__MSG__SHARE__', 'discussionslibrary'),
                    'trigger': 'oae-trigger-share',
                    'data': {'resourceType': 'discussion'}
                });

                if (widgetData.canManage) {
                    // If the user is the manager of the library, they have the option to delete items
                    listHeaderActions.push({
                        'icon': 'fa-trash-o',
                        'label': oae.api.i18n.translate('__MSG__DELETE__', 'discussionslibrary'),
                        'trigger': 'oae-trigger-deleteresources',
                        'data': {'resourceType': 'discussion'}
                    });
                }
            }

            oae.api.util.template().render($('#discussionslibrary-list-header-template', $rootel), {'actions': listHeaderActions}, $('#discussionslibrary-list-header', $rootel));
        };

        /**
         * Add the different event bindings
         */
        var addBinding = function() {

            // Listen to History.js state changes
            $(window).on('statechange', function() {
                // Only re-load the discussion list when the widget is currently visible
                if ($rootel.is(':visible')) {
                    getDiscussionsLibrary();
                }
            });

            // Listen to the event that indicates that a piece of content has been deleted
            // so the library can be reloaded
            $(window).on('oae.deleteresources.done', function() {
                // Only re-load the discussion list when the widget is currently visible
                if ($rootel.is(':visible')) {
                    getDiscussionsLibrary();
                }
            });
        };

        addBinding();
        setUpListHeader();
        getDiscussionsLibrary();

    };
});
