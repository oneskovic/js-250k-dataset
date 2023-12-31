casper.test.begin('Widget - Edit group', function(test) {

    /**
     * Verify that the editgroup widget can be triggered
     */
    var openEditGroup = function() {
        casper.waitForSelector('#group-clip-container .oae-clip-content > button', function() {
            casper.click('#group-clip-container .oae-clip-content > button');
            casper.waitForSelector('button.group-trigger-editgroup', function() {
                test.assertExists('button.group-trigger-editgroup', 'The edit group trigger is present');
                casper.click('button.group-trigger-editgroup');
                casper.waitUntilVisible('#editgroup-modal', function() {
                    test.assertVisible('#editgroup-modal', 'Edit group pane is showing after trigger');
                    casper.click('#group-clip-container .oae-clip-content > button');
                });
            });
        });
    };

    /**
     * Verify that the editgroup form elements are present
     */
    var verifyEditGroupFormElements = function() {
        // If you only wait for the editgroup-modal it's still not completly loaded
        // So there will be waited till even the modal-footer is loaded
        casper.waitForSelector('#editgroup-modal', function() {
            test.assertExists('form#editgroup-form', 'The edit group form is present');
            test.assertExists('form#editgroup-form #editgroup-name', 'The edit group name field is present');
            test.assertExists('form#editgroup-form #editgroup-description', 'The edit group description field is present');
            test.assertExists('form#editgroup-form .oae-large-options-container input[name="oae-joinable-group"]', 'The editgroup joinable options are present');
            test.assertExists('form#editgroup-form button[type="submit"]', 'The edit group form submit button is present');
        });
    };

    /**
     * Verify that the editgroup form is properly validated:
     *  - Submit empty form
     *  - Submit empty name with description
     */
    var verifyEditGroupFormValidation = function() {
        casper.waitForSelector('#editgroup-modal', function() {
            // Submit empty form
            casper.fill('form#editgroup-form', {
                'editgroup-name': '',
                'editgroup-description': ''
            });
            casper.click('#editgroup-modal button[type="submit"]');
            test.assertVisible('#editgroup-name-error', 'Verify validating empty form, name error');

            // Submit empty name with description
            casper.fill('form#editgroup-form', {
                'editgroup-name': '',
                'editgroup-description': 'Group description'
            });
            casper.click('#editgroup-modal button[type="submit"]');
            test.assertVisible('#editgroup-name-error', 'Verify validating form without name');
        });
    };

    /**
     * Verify that a group can be edited
     */
    var verifyEditGroup = function() {
        // Fill the form
        casper.fill('form#editgroup-form', {
            'editgroup-name': 'New group name',
            'editgroup-description': 'New group description'
        });
        // Submit the editdiscussion form
        casper.click('form#editgroup-form button[type="submit"]');
        // Verify that the changes have been persisted
        casper.waitForSelector('#oae-notification-container .alert', function() {
            test.assertDoesntExist('#oae-notification-container .alert.alert-error', 'The group details were successfully saved');
            test.assertSelectorHasText('#group-clip-container h1', 'New group name', 'The group was successfully renamed to \'New group name\'');
        });
    };

    casper.start(configUtil.tenantUI, function(){
        // Create an user to test with
        userUtil.createUsers(1, function(user1) {
            // Log in with that user
            userUtil.doLogIn(user1.username, user1.password);

            // Create a group
            groupUtil.createGroup(null, null, null, null, null, null, function(err, groupProfile) {

                uiUtil.openGroupProfile(groupProfile);

                // Verify that the group can be edited
                casper.then(function() {
                    casper.echo('# Verify editgroup modal', 'INFO');
                    openEditGroup();
                });

                // Verify that the group form elements are present
                casper.then(function() {
                    casper.echo('# Verify editgroup form elements', 'INFO');
                    verifyEditGroupFormElements();
                });

                // Verify that the errors from the group form works
                casper.then(function() {
                    casper.echo('# Verify editgroup form validation', 'INFO');
                    verifyEditGroupFormValidation();
                });

                casper.then(function() {
                    casper.echo('# Verify group can be edited', 'INFO');
                    verifyEditGroup();
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
