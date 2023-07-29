casper.test.begin('Widget - Discussion', function(test) {

    /**
     * Verify that all discussion elements are present
     */
    var verifyDiscussionElements = function() {
        casper.waitForSelector('#discussion-topic', function() {
            test.assertExists('#discussion-topic', 'Verify the discussion topic container is present');
            test.assertSelectorHasText('#discussion-topic', 'Talk about all the things!', 'Verify the discussion topic container holds the correct discussion topic');
        });
    };

    casper.start(configUtil.tenantUI, function() {
        // Create a user to test with
        userUtil.createUsers(1, function(user1) {
            // Login with that user
            userUtil.doLogIn(user1.username, user1.password);

            discussionUtil.createDiscussion(null, null, null, null, null, function(err, discussionProfile) {
                // Redirect to the discussion profile
                uiUtil.openDiscussionProfile(discussionProfile);

                casper.then(function() {
                    casper.echo('# Verify discussion elements', 'INFO');
                    verifyDiscussionElements();
                });

                // Log out the admin user
                userUtil.doLogOut();
            });
        });
    });

    casper.run(function() {
        test.done();
    });
});
