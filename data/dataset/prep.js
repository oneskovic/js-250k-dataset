casper.test.begin('Prepare environment for tests', function(test) {

    // Override default waitTimeout before test fails
    casper.options.waitTimeout = configUtil.waitTimeout;

    // Set the default size of the viewport
    casper.options.viewportSize = {'width': 1200, 'height': 800};

    /**
     * Log any JavaScript errors in the page
     *
     * @param  {String}    msg    The error in the page
     */
    casper.on('page.error', function(msg) {
        casper.echo('JavaScript error caught in the page: ' + msg, 'COMMENT');
    });

    /**
     * Catch remote callbacks and execute an event when the callback data has a callback ID
     *
     * @param  {Object}    data    Data sent back from within the callback
     */
    casper.on('remote.callback', function(data) {
        if (data && data.cbId) {
            casper.emit(data.cbId + '.finished', data);
        }
    });

    /**
     * A function to be executed when a waitFor* function execution time exceeds the value of the waitTimeout option,
     * if any has been set. By default, on timeout the script will exit displaying an error,
     * except in test environment where it will just add a failure to the suite results.
     *
     * @param  {Number}    waitTimeout    Default wait timeout, for wait* family functions.
     */
    casper.options.onWaitTimeout = function(waitTimeout) {
        // Log out of the system
        userUtil.doLogOut();

        // Finish the current test to skip to the next one
        casper.wait(configUtil.modalWaitTime, function() {
            test.fail('Test timed out after ' + waitTimeout + ' ms');
            test.done();
        });
    };

    test.done();

});
