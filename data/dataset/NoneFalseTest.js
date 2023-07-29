Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.preselectAutofill.NoneFalseTest",
    $extends : "test.aria.widgets.form.multiautocomplete.preselectAutofill.MACPreselectAutofillBaseTest",
    $constructor : function () {
        this.autofill = false;
        this.preselect = "none";
        this.allTestValues = {
            freetext : {
                input : ["p", "", "p1", "", "p", "", "p1-4", ""],
                dataModel : [null, ["p"], null, ["p1"], null, [{
                                    label : "P4. TESTER D",
                                    code : "P4"
                                }], null, [{
                                    label : "P1. TESTER A",
                                    code : "P1"
                                }, {
                                    label : "P2. TESTER B",
                                    code : "P2"
                                }, {
                                    label : "P3. TESTER C",
                                    code : "P3"
                                }, {
                                    label : "P4. TESTER D",
                                    code : "P4"
                                }]],
                items : [[4], [0], [1], [0], [4, [0]], [0], [4, [0, 1, 2, 3]], [0]]
            }
        };

        this.allTestValues.noFreetext = aria.utils.Json.copy(this.allTestValues.freetext);
        this.allTestValues.noFreetext.dataModel[1] = [];
        this.allTestValues.noFreetext.dataModel[3] = [];
        this.allTestValues.noFreetext.input[1] = "p";
        this.allTestValues.noFreetext.input[3] = "p1";

        this.$MACPreselectAutofillBaseTest.constructor.call(this);
    }
});
