/**
 * Sample class used to test EnableMethodEvents for Module Controller
 */
Aria.classDefinition({
    $classpath : "test.aria.templates.test.EnableMethodEventsModuleCtrl",
    $extends : "aria.templates.ModuleCtrl",
    $implements : ["test.aria.templates.test.IEnableMethodEventsModuleCtrl"],
    $constructor : function (args) {
        this._enableMethodEvents = true;
        this.$ModuleCtrl.constructor.call(this);
        this.$on({
            "methodCallBegin" : this.onMethodCallBegin,
            scope : this
        });
        this.$on({
            "methodCallEnd" : this.onMethodCallEnd,
            scope : this
        });
        this.eventCallBeginRaised = false;
    },
    $destructor : function () {
        this.$publicInterface().EnableMethodEventsModuleCtrDisposed = true;
        this.$ModuleCtrl.$destructor.call(this);
    },
    $prototype : {
        $publicInterfaceName : "test.aria.templates.test.IEnableMethodEventsModuleCtrl",

        /**
         * Sample method to test method events
         */
        testMethod : function () {
            this.eventCallEndRaised = false;
        },
        onMethodCallBegin : function () {
            this.eventCallBeginRaised = true;
        },
        onMethodCallEnd : function () {
            this.eventCallEndRaised = true;
        }
    }
});
