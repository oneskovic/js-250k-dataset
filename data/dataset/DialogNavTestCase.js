/**
 * Test keymap navigation (the specific case of ESCAPE handled by a user defined callback and a Dialog)
 */
Aria.classDefinition({
    $classpath : "test.aria.templates.keyboardNavigation.DialogNavTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.data = {
            escapeEvts : 0
        };

        this.setTestEnv({
            data : this.data
        });
    },
    $prototype : {
        runTemplateTest : function () {
            this._typeEsc({
                fn : this._openDialog,
                scope : this
            });
        },

        _openDialog : function () {
            // key shortcut callback should have been called once (dialog is not visible)
            this.assertEquals(this.data.escapeEvts, 1, "key shortcut callback has been called %1 times while it should be called once.");
            aria.utils.Json.setValue(this.data, "dialogOpen", true);
            this._typeEsc({
                fn : this._retryEscape,
                scope : this
            });
        },

        _retryEscape : function () {
            // key shortcut callback should have been called once (dialog has been shown and escape keypress hid it: no
            // callback is triggered)
            this.assertEquals(this.data.escapeEvts, 1, "key shortcut callback has been called %1 times while it should be called once.");
            this._typeEsc({
                fn : this._end,
                scope : this
            });
        },

        _end : function () {
            // key shortcut callback should have been called for the second time (the escape keypress has been handled
            // by the callback)
            this.assertEquals(this.data.escapeEvts, 2, "key shortcut callback has been called %1 times while it should be called twice.");
            this.notifyTemplateTestEnd();
        },

        _typeEsc : function (callback) {
            this.synEvent.type(this.getElementById("toBeFocused"), "[escape]", callback);
        }
    }
});
