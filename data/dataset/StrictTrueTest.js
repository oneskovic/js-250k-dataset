Aria.classDefinition({
    $classpath : "test.aria.widgets.form.multiautocomplete.preselectAutofill.StrictTrueTest",
    $extends : "test.aria.widgets.form.multiautocomplete.preselectAutofill.MACPreselectAutofillBaseTest",
    $constructor : function () {
        this.allTestValues = {
            freetext : {
                input : ["p", "", "p1", "", "P4. TESTER D", "", "p1-4", ""],
                dataModel : [null, ["p"], null, [{
                                    label : "P1. TESTER A",
                                    code : "P1"
                                }], null, [{
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
                items : [[4], [0], [1, [0]], [0], [4, [0]], [0], [4, [0, 1, 2, 3]], [0]]
            },
            noFreetext : {
                input : ["p", "p", "p1", "", "P4. TESTER D", "", "p1-4", ""],
                dataModel : [null, [], null, [{
                                    label : "P1. TESTER A",
                                    code : "P1"
                                }], null, [{
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
                items : [[4], [0], [1, [0]], [0], [4, [0]], [0], [4, [0, 1, 2, 3]], [0]]
            }
        };

        this.$MACPreselectAutofillBaseTest.constructor.call(this);
    }
});
