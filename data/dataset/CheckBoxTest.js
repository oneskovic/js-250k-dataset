Aria.classDefinition({
    $classpath : "test.aria.html.checkbox.CheckBoxTest",
    $extends : "test.aria.html.inputElement.InputElementBaseTest",
    $dependencies : ["aria.html.CheckBox", "aria.utils.Json", "aria.utils.FireDomEvent"],
    $prototype : {

        _widgetClass : "aria.html.CheckBox",

        testInitialValueFalse : function () {
            var container = {};

            var cfg = {
                bind : {
                    checked : {
                        inside : container,
                        to : "checkstate"
                    }
                }
            };

            var widget = this.createAndInit("aria.html.CheckBox", cfg);

            this.assertEquals(widget._domElt.checked, false, "Checked bound to initial false: "
                    + widget._domElt.checked);

            aria.utils.Json.setValue(container, "checkstate", true);
            this.assertEquals(widget._domElt.checked, true, "Set checked to true: " + widget._domElt.checked);

            widget.$dispose();
            this.outObj.clearAll();
        },

        testInitialValueTrue : function () {
            var container = {
                checkstate : true
            };

            var cfg = {
                bind : {
                    checked : {
                        inside : container,
                        to : "checkstate"
                    }
                }
            };

            var widget = this.createAndInit("aria.html.CheckBox", cfg);

            this.assertEquals(widget._domElt.checked, true, "Checked bound to initial true: " + widget._domElt.checked);

            aria.utils.Json.setValue(container, "checkstate", false);
            this.assertEquals(widget._domElt.checked, false, "Set checked to false: " + widget._domElt.checked);

            widget.$dispose();
            this.outObj.clearAll();
        },

        testTransformFromWidget : function () {
            var container = {
                checkstate : 'checked'
            };

            var cfg = {
                bind : {
                    checked : {
                        inside : container,
                        to : "checkstate",
                        transform : {
                            fromWidget : function (v) {
                                return v ? 'checked' : 'not_checked';
                            },
                            toWidget : function (v) {
                                return v === 'checked';
                            }
                        }
                    }
                }
            };

            var widget = this.createAndInit("aria.html.CheckBox", cfg);

            this.assertEquals(widget._domElt.checked, true, "Transform to widget true: " + widget._domElt.checked);

            aria.utils.Json.setValue(container, "checkstate", 'not_checked');
            this.assertEquals(widget._domElt.checked, false, "Transform to widget false: " + widget._domElt.value);

            widget.$dispose();
            this.outObj.clearAll();
        },

        testReactOnClick : function () {
            var container = {};

            var cfg = {
                bind : {
                    checked : {
                        inside : container,
                        to : "checkstate"
                    }
                }
            };

            var widget = this.createAndInit("aria.html.CheckBox", cfg);

            aria.utils.FireDomEvent.fireEvent("click", widget._domElt);

            this.assertEquals(widget._domElt.checked, true, "Check click on dom: " + widget._domElt.checked);
            this.assertEquals(container.checkstate, true, "Check click on data: " + container.checkstate);

            widget.$dispose();
            this.outObj.clearAll();
        }
    }
});
