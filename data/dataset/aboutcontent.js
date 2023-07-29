define(['jquery', 'oae.core'], function($, oae) {

    return function(uid) {

        // The widget container
        var $rootel = $('#' + uid);

        /**
         * Render the metadata for the current content item
         *
         * @param  {Content}    contentProfile    Content for which the metadata should be rendered
         */
        var renderMetadata = function(contentProfile) {
            oae.api.util.template().render($('#aboutcontent-template', $rootel), {
                'contentProfile': contentProfile,
                'displayOptions': {
                     'linkTarget': '_blank'
                }
            }, $('#aboutcontent-container', $rootel));
        };

        /**
         * Initialize the aboutcontent modal dialog
         */
        var setUpAboutContent = function() {
            $(document).on('click', '.oae-trigger-aboutcontent', function(ev, data) {
                // Request the context profile information
                $(document).trigger('oae.context.get', 'aboutcontent');
            });

            // Receive the context's profile information and set up the aboutcontent modal
            $(document).on('oae.context.send.aboutcontent', function(ev, contentProfile) {
                // Show the aboutcontent modal
                $('#aboutcontent-modal', $rootel).modal();
                // Render the metadata for the current content item
                renderMetadata(contentProfile);
            });
        };

        setUpAboutContent();

    };
});
