/**
 * This test verifies that if your body is already scrolled and you open a modal dialog the scrolltop position of the
 * body doesn't change
 */
Aria.classDefinition({
    $classpath : "test.aria.widgets.container.dialog.scroll.OnScrollTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Json"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.data = {
            dialogVisible : false
        };
        this.setTestEnv({
            template : "test.aria.widgets.container.dialog.scroll.OnScrollTestCaseTpl",
            data : this.data,
            iframe : true
        });
    },
    $prototype : {
        runTemplateTest : function () {
            var docScrollElm = this.testWindow.aria.utils.Dom.getDocumentScrollElement();
            docScrollElm.scrollTop = 30;
            this.assertEquals(docScrollElm.scrollTop, 30);

            this.divWrapper = this.templateCtxt.$getElementById("myDiv");
            // In IE7, if we do not wait before calling setScroll, it is
            // not taken into account
            aria.core.Timer.addCallback({
                fn : this._afterWait,
                scope : this,
                delay : 10
            });
        },

        _afterWait : function () {
            this.divWrapper.setScroll({
                scrollTop : 300
            });
            aria.core.Timer.addCallback({
                fn : this._displayDialog,
                scope : this,
                delay : 10
            });
        },

        _displayDialog : function () {
            // check scroll position before dialog is displayed:
            var scrollTop = this.divWrapper.getScroll().scrollTop;
            this.assertEquals(scrollTop, 300, "setScroll did not work");
            aria.utils.Json.setValue(this.data, "dialogVisible", true);
            aria.core.Timer.addCallback({
                fn : this._hideDialog,
                scope : this,
                delay : 200
            });
        },

        _hideDialog : function () {
            // check scroll position after dialog is displayed:
            var scrollTop = this.divWrapper.getScroll().scrollTop;
            this.assertEquals(scrollTop, 300, "Displaying the dialog changed the scroll position.");
            this.assertEquals(this.testWindow.aria.utils.Dom.getDocumentScrollElement().style.overflow, "hidden");
            if (scrollTop != 300) {
                this.divWrapper.setScroll({
                    scrollTop : 300
                });
            }
            aria.utils.Json.setValue(this.data, "dialogVisible", false);
            aria.core.Timer.addCallback({
                fn : this._testEnd,
                scope : this,
                delay : 200
            });
        },

        _testEnd : function () {
            // check scroll position after dialog is hidden:
            var scrollTop = this.divWrapper.getScroll().scrollTop;
            var docScrollElm = this.testWindow.aria.utils.Dom.getDocumentScrollElement();
            this.assertEquals(docScrollElm.scrollTop, 30);
            this.assertEquals(scrollTop, 300, "Hiding the dialog changed the scroll position.");
            this.divWrapper.$dispose();
            this.notifyTemplateTestEnd();
        }

    }
});
