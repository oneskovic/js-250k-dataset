casper.test.begin('Widget - Link preview', function(test) {

    /**
     * Verifies that the link is shown in an iframe on the content profile
     */
    var verifyLinkPreview = function() {
        casper.waitForSelector('#linkpreview-container', function() {
            test.assertExists('#linkpreview-container', 'The link preview container is present');
        });
    };

    casper.start(configUtil.tenantUI, function() {
        // Create a couple of users to test with
        userUtil.createUsers(1, function(user1) {
            // Log in with that user
            userUtil.doLogIn(user1.username, user1.password);

            contentUtil.createLink(null, null, null, null, null, null, null, function(err, linkProfile) {
                uiUtil.openLinkProfile(linkProfile);

                // Verify default previews
                casper.then(function() {
                    casper.echo('# Verify link preview elements present', 'INFO');
                    verifyLinkPreview();
                });

                // Log out at the end of the test
                userUtil.doLogOut();
            });
        });
    });

    casper.run(function() {
        test.done();
    });
});
