casper.test.begin('Widget - Import Users', function(test) {

    /**
     * Open the import users modal with assertions
     */
    var openImportUsers = function() {
        casper.waitForSelector('#usermanagement-widget #usermanagement-importusers', function() {
            test.assertExists('#usermanagement-widget #usermanagement-importusers', 'Import users trigger exists');
            casper.click('#usermanagement-widget #usermanagement-importusers');
            casper.waitUntilVisible('#importusers-modal', function() {
                test.assertVisible('#importusers-modal', 'Import users pane is showing after trigger');
            });
        });
    };

    /**
     * Verify that import users elements are present
     */
    var verifyImportUsersElements = function() {
        test.assertExists('#importusers-modal .modal-header h3', 'Verify the import users modal has a header title');
        test.assertSelectorHasText('#importusers-modal .modal-header h3', 'Import users' , 'Verify the import users modal header title reads \'Import users\'');
        test.assertExists('#importusers-modal #importusers-form', 'Verify the import users modal has a form');
        test.assertExists('#importusers-modal .modal-body .alert-info', 'Verify the import users modal has an expected format description container');
        test.assertExists('#importusers-modal #importusers-form #importusers-authentication', 'Verify the import users modal has an authentication method dropdown');
        test.assertExists('#importusers-modal #importusers-form #importusers-csv[type="file"][accept="text/csv"]', 'Verify the import users modal form has a CSV upload field');
        test.assertExists('#importusers-modal #importusers-form button[data-dismiss="modal"]', 'Verify the import users modal has a cancel button');
        test.assertExists('#importusers-modal #importusers-form button[type="submit"]', 'Verify the import users modal form has a submit button');
    };

    /**
     * Verify that the import users form is properly validated
     */
    var verifyImportUsersFormValidation = function() {
        casper.fill('#importusers-modal #importusers-form', {
            'importusers-authentication': 'Internal',
            'file': 'tests/casperjs/data/balloons.jpg'
        }, true);
        casper.waitForSelector('#oae-notification-container .alert', function() {
            test.assertExists('#oae-notification-container .alert.alert-error', 'Verify only CSV files can be uploaded');
            casper.click('#oae-notification-container .close');
        });
    };

    /**
     * Verify that import users can upload and properly imports a CSV file
     */
    var verifyImportUsersUpload = function() {
        casper.fill('#importusers-modal #importusers-form', {
            'importusers-authentication': 'Internal',
            'file': 'tests/casperjs/data/oae-users.csv'
        }, true);
        casper.waitForSelector('#oae-notification-container .alert', function() {
            test.assertDoesntExist('#oae-notification-container .alert.alert-error', 'Verify that CSV files can be uploaded');
            casper.click('#oae-notification-container .close');
        });
    };

    /**
     * Verify that the CSV import results in usable users
     */
    var verifyCSVImport = function() {
        userUtil.doLogIn('user1@example.com', 'password');
        uiUtil.openMe();
        casper.then(function() {
            test.assertExists('#me-clip-container h1', 'Verify the imported user has a functional account');
        });
    };

    casper.start(configUtil.adminUI, function() {

        casper.then(function() {
            casper.echo('# Verify open import users modal', 'INFO');
            userUtil.doLogIn(configUtil.adminUsername, configUtil.adminPassword);
            uiUtil.openAdminUserManagement(configUtil.tenantAlias);
            openImportUsers();
        });

        casper.then(function() {
            casper.echo('# Verify import users elements', 'INFO');
            verifyImportUsersElements();
        });

        casper.then(function() {
            casper.echo('# Verify import users form validation', 'INFO');
            verifyImportUsersFormValidation();
        });

        casper.then(function() {
            casper.echo('# Verify import users CSV upload', 'INFO');
            verifyImportUsersUpload();
        });

        userUtil.doLogOut();
        uiUtil.openIndex();

        casper.then(function() {
            casper.echo('# Verify CSV import results in usable users', 'INFO');
            verifyCSVImport();
        });

        userUtil.doLogOut();
    });

    casper.run(function() {
        test.done();
    });
});
