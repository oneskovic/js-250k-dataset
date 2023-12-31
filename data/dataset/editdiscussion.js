casper.test.begin('Widget - Edit discussion', function(test) {

    /**
     * Verify that the editDiscussion button can be pressed and press it
     */
    var openEditDiscussion = function() {
        casper.waitForSelector('#discussion-clip-container .oae-clip-content > button', function() {
            casper.click('#discussion-clip-container .oae-clip-content > button');
            casper.waitForSelector('button.oae-trigger-editdiscussion', function() {
                test.assertVisible('button.oae-trigger-editdiscussion', 'Edit discussion trigger exists');
                casper.click('button.oae-trigger-editdiscussion');
                casper.waitUntilVisible('#editdiscussion-modal', function() {
                    test.assertVisible('#editdiscussion-modal', 'Edit discussion pane is showing after trigger');
                    casper.click('#discussion-clip-container .oae-clip-content > button');
                });
            });
        });
    };

    /**
     * Verify that the editdiscussion form is present
     */
    var verifyEditDiscussionFormElements = function() {
        casper.waitForSelector('#editdiscussion-modal', function() {
            test.assertExists('form#editdiscussion-form','The edit discussion form is present');
            test.assertExists('form#editdiscussion-form #editdiscussion-name','The edit discussion name field is present');
            test.assertExists('form#editdiscussion-form #editdiscussion-topic','The edit discussion topic field is present');
            test.assertExists('form#editdiscussion-form button[type="submit"]','The edit discussion form submit button is present');
        });
    };

    /**
     * Verify that the following forms give an error:
     *  - Form without name and topic
     *  - Form without topic
     *  - Form without name
     */
    var verifyEditDiscussionFormValidate = function() {
        // Form without name and topic
        casper.fill('form#editdiscussion-form', {
            'editdiscussion-name': '',
            'editdiscussion-topic': ''
        }, false);
        casper.click('#editdiscussion-form button[type="submit"]');
        test.assertVisible('#editdiscussion-name-error', 'Verify validating empty form, name-error is visible');
        test.assertVisible('#editdiscussion-topic-error', 'Verify validating empty form, topic-error is visible');

        // Form without topic
        casper.fill('form#editdiscussion-form', {
            'editdiscussion-name': 'Test',
            'editdiscussion-topic': ''
        }, false);
        casper.click('#editdiscussion-form button[type="submit"]');
        test.assertNotVisible('#editdiscussion-name-error', 'Verify validating empty topic, name-error is not visible');
        test.assertVisible('#editdiscussion-topic-error', 'Verify validating empty topic, topic-error is visible');

        // Form without name
        casper.fill('form#editdiscussion-form', {
            'editdiscussion-name': '',
            'editdiscussion-topic': 'Test'
        }, false);
        casper.click('#editdiscussion-form button[type="submit"]');
        test.assertVisible('#editdiscussion-name-error', 'Verify validating empty name, name-error is visible');
        test.assertNotVisible('#editdiscussion-topic-error', 'Verify validating empty name, topic-error is not visible');
    };

    /**
     * Verify that a discussion can be edited
     */
    var verifyEditDiscussion = function() {
        // Fill the form
        casper.fill('form#editdiscussion-form', {
            'editdiscussion-name': 'New discussion name',
            'editdiscussion-topic': 'New discussion topic'
        }, false);
        // Submit the editdiscussion form
        casper.click('#editdiscussion-form button[type="submit"]');
        // Verify that the changes have been persisted
        casper.waitForSelector('#oae-notification-container .alert', function() {
            test.assertDoesntExist('#oae-notification-container .alert.alert-error', 'The discussion details were successfully saved');
            test.assertSelectorHasText('#discussion-clip-container h1', 'New discussion name', 'The discussion name was successfully renamed to \'New discussion name\'');
            test.assertSelectorHasText('#discussion-topic', 'New discussion topic', 'The discussion topic was successfully changed to \'New discussion topic\'');
        });
    };

    casper.start(configUtil.tenantUI, function(){
        // Create a user to test with
        userUtil.createUsers(1, function(user1) {
            // Log in with that user
            userUtil.doLogIn(user1.username, user1.password);

            // Create a discussion
            discussionUtil.createDiscussion(null, null, null, null, null, function(err, discussionProfile) {

                uiUtil.openDiscussionProfile(discussionProfile);

                // Verify that editdiscussions can be triggered
                casper.then(function() {
                    casper.echo('# Verify editdiscussion modal','INFO');
                    openEditDiscussion();
                });

                // Verify that the edit discussion form is opened and visible
                casper.then(function() {
                    casper.echo('# Verify editdiscussion form elements','INFO');
                    verifyEditDiscussionFormElements();
                });

                // Verify that the errors from the edit form works
                casper.then(function() {
                    casper.echo('# Verify editdiscussion form validation','INFO');
                    verifyEditDiscussionFormValidate();
                });

                // Verify that the details can be edited
                casper.then(function() {
                    casper.echo('# Verify discussion can be edited','INFO');
                    verifyEditDiscussion();
                });

                // Log out again
                userUtil.doLogOut();
            });
        });
    });

    casper.run(function() {
        test.done();
    });
});
