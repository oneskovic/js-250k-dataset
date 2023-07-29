Aria.classDefinition({
    $classpath : "test.aria.jsunit.ModuleControllerTestCase",
    $extends : "aria.jsunit.ModuleCtrlTestCase",
    $dependencies : ["test.aria.jsunit.mock.RedirectToFile"],
    $prototype : {
        $controller : "test.aria.jsunit.mock.SimpleController",

        setUp : function () {
            aria.core.IOFiltersMgr.addFilter("test.aria.jsunit.mock.RedirectToFile");
        },

        tearDown : function () {
            aria.core.IOFiltersMgr.removeFilter("test.aria.jsunit.mock.RedirectToFile");
        },

        testAsyncCallTheServer : function () {
            this.$moduleCtrl.processCommand({
                fn : this.after,
                scope : this
            });
        },

        after : function () {
            this.assertEventFired("responseReceived");
            // This checks that there are no response error
            this.assertLogsClean();
            var data = this.$moduleCtrl.getData();
            this.assertJsonEquals(data, {
                response : {
                    one : 1
                }
            });
            this.notifyTestEnd("testAsyncCallTheServer");
        }
    }
});
