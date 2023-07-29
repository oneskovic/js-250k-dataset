define(['jquery', 'oae.core'], function($, oae) {

    return function(uid) {

        // The widget container
        var $rootel = $('#' + uid);

        /**
         * Render the metadata for the current discussion item
         *
         * @param  {Discussion}    discussionProfile    Discussion for which the metadata should be rendered
         */
        var renderMetadata = function(discussionProfile) {
            oae.api.util.template().render($('#aboutdiscussion-template', $rootel), {
                'discussionProfile': discussionProfile,
                'displayOptions': {
                     'linkTarget': '_blank'
                }
            }, $('#aboutdiscussion-container', $rootel));
        };

        /**
         * Initialize the aboutdiscussion modal dialog
         */
        var setUpAboutDiscussion = function() {
            $(document).on('click', '.oae-trigger-aboutdiscussion', function(ev, data) {
                // Request the context profile information
                $(document).trigger('oae.context.get', 'aboutdiscussion');
            });

            // Receive the context's profile information and set up the aboutdiscussion modal
            $(document).on('oae.context.send.aboutdiscussion', function(ev, discussionProfile) {
                // Show the aboutdiscussion modal
                $('#aboutdiscussion-modal', $rootel).modal();
                // Render the metadata for the current discussion item
                renderMetadata(discussionProfile);
            });
        };

        setUpAboutDiscussion();

    };
});
