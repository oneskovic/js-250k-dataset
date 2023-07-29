// See what happens when both success and fail callback are present
Aria.classDefinition({
    $classpath : "test.aria.jsunit.load.CompleteLoad",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["test.aria.jsunit.load.dependencies.Met"],
    $prototype : {
        logSomething : function (message) {
            // Log something so that the tester can assert that we called the callback from checkExpectedEventListEnd
            this.$logError(message);
        },

        testAsyncLoad: function () {
            // Expect the complete callback to be called before actually finishing the test
            this._expectedErrorList = ["oncomplete called"];

            Aria.load({
                classes : ["test.aria.jsunit.load.dependencies.Missed"],
                oncomplete : {
                    fn : this.logSomething,
                    scope : this,
                    args : "oncomplete called"
                },
                onerror : {
                    fn : this.logSomething,
                    scope : this,
                    args : "onerror called"
                }
            });

            this.notifyTestEnd("testAsyncLoad");
        },

        testAsyncLoadError: function () {
            // Expect the complete callback to be called before actually finishing the test
            this._expectedErrorList = ["onerror called", aria.core.MultiLoader.LOAD_ERROR];

            Aria.load({
                classes : ["test.aria.jsunit.load.dependencies.FileNotFound"],
                oncomplete : {
                    fn : this.logSomething,
                    scope : this,
                    args : "oncomplete called"
                },
                onerror : {
                    fn : this.logSomething,
                    scope : this,
                    args : "onerror called"
                }
            });

            this.notifyTestEnd("testAsyncLoadError");
        },

        testAsyncLoadErrorWithOverride: function () {
            // By overriding we prevent the class load error to be logged
            this._expectedErrorList = ["onerror called"];

            Aria.load({
                classes : ["test.aria.jsunit.load.dependencies.FileNotFoundAgain"],
                oncomplete : {
                    fn : this.logSomething,
                    scope : this,
                    args : "oncomplete called"
                },
                onerror : {
                    fn : this.logSomething,
                    scope : this,
                    args : "onerror called",
                    override : true
                }
            });

            this.notifyTestEnd("testAsyncLoadError");
        },

        testAsyncLoadSync: function () {
            Aria.load({
                classes : ["test.aria.jsunit.load.dependencies.Met"],
                oncomplete : {
                    fn : this.logSomething,
                    scope : this,
                    args : "oncomplete called"
                },
                onerror : {
                    fn : this.logSomething,
                    scope : this,
                    args : "onerror called"
                }
            });

            // I expect the error to be here already because Aria.load should be synchronous
            this.assertErrorInLogs("oncomplete called");

            this.notifyTestEnd("testAsyncLoadSync");
        }
    }
});
