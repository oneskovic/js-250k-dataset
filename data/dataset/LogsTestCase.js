Aria.classDefinition({
    $classpath : "test.aria.templates.inheritance.logs.LogsTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies: ["aria.core.Log"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);

        this.setTestEnv({
            template : "test.aria.templates.inheritance.logs.ChildTemplate"
        });

    },

    $prototype : {

        runTemplateTest : function () {

            var logAppender = aria.core.Log.getAppenders()[0];
            var logs = logAppender.getLogs();

            var expectedErrorsNb = 2;
            this.assertEquals(logs.length, expectedErrorsNb, "Logs should report %2 error instead of %1");

            if (logs.length == expectedErrorsNb) {
                var logIndex = 0;

                var log = logs[logIndex++];
                this.assertEquals(log.className,
                        "test.aria.templates.inheritance.logs.ChildTemplate",
                        "The classname should be %2 instead of %1");
                this.assertEquals(log.msg,
                        "file test/aria/templates/inheritance/logs/ParentTemplate.tpl, line 24: Uncaught exception in macro 'macroWithError'",
                        "The message should be %2 instead of %1");

                var log = logs[logIndex++];
                this.assertEquals(log.className,
                        "test.aria.templates.inheritance.logs.ChildTemplate",
                        "The classname should be %2 instead of %1");
                this.assertEquals(log.msg,
                        "file test/aria/templates/inheritance/logs/ParentTemplate.tpl, line 29: Template error: cannot iterate over a null or undefined variable.",
                        "The message should be %2 instead of %1");



                logs.length = 0;
            }
            this.end();
        }

    }
});
