Aria.classDefinition({
    $classpath : "test.aria.pageEngine.IframeTestCase",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.utils.FrameATLoader", "aria.core.log.SilentArrayAppender"],
    $constructor : function () {
        this.$TestCase.constructor.call(this);
        this._dependencies = [];
    },
    $prototype : {

        testAsyncInIframe : function () {
            this.loadIframe({
                fn : this.runTestInIframe,
                scope : this
            });
        },

        loadIframe : function (cb) {
            var testEnv;
            var document = Aria.$window.document;
            var iframe = document.createElement("iframe");
            iframe.id = "test-iframe";
            iframe.style.cssText = this.IFRAME_BASE_CSS_TEXT;
            document.body.appendChild(iframe);
            this._iframe = iframe;
            testEnv = iframe;
            aria.utils.FrameATLoader.loadAriaTemplatesInFrame(testEnv, {
                fn : this._onIframeReady,
                scope : this,
                args : cb,
                resIndex : -1
            });

        },

        removeIframe : function () {
            this._iframe.parentNode.removeChild(this._iframe);
            this._iframe = null;
            this._testWindow = null;

        },

        reloadIframe : function (cb) {
            this.removeIframe();
            this.loadIframe(cb);
        },

        _onIframeReady : function (cb) {
            this._testWindow = this._iframe.contentWindow;
            var iDocument = this._testWindow.document;
            var newDiv = iDocument.createElement('div');
            newDiv.id = "at-main";
            iDocument.body.appendChild(newDiv);
            newDiv = null;

            this.waitFor({
                condition : function () {
                    try {
                        return !!this._testWindow.Aria.load;
                    } catch (ex) {
                        return false;
                    }
                },
                callback : {
                    fn : this._waitForAriaLoad,
                    scope : this,
                    args : cb,
                    resIndex : -1
                }
            });
        },

        _waitForAriaLoad : function (cb) {
            this._testWindow.aria.core.Log.addAppender(aria.core.Log.getAppenders()[0]);
            if (this._dependencies.length > 0) {
                this._testWindow.Aria.load({
                    classes : this._dependencies,
                    oncomplete : cb
                });
            } else {
                this.$callback(cb);
            }

        },

        runTestInIframe : Aria.empty,

        end : function () {
            this.removeIframe();
            this.notifyTestEnd("testAsyncInIframe");
        }

    }
});
