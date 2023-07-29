({

    checkOutput: function(cmp, id, expected) {
        var el = document.getElementById(id);
        var els = el.childNodes;

        var actual = [];
        for (var i = 0; i<els.length; i++) {
            var text = $A.test.getText(els[i]);
            actual.push(text.split("\n").join(";"));
        }

        aura.test.assertEquals(expected.join(";"), actual.join(";"), "Value not expected in "+ id);        

    },

    /**
     *  This test validates that Aura handles attributes set by children.
     */
    testAttributeSetByChildDefault: {
        test: function(cmp) {
            this.checkOutput(cmp, "parent-address",  ["Seattle (default child)", "Washington (default child)"]);
            this.checkOutput(cmp, "child-address",  ["Seattle (default child)", "Washington (default child)"]);
        }
    },

    /**
     *  This test validates that Aura handles attributes set by children.
     */
    // TODO: W-2406307: remaining Halo test failure
    _testAttributeSetByChildPassed: {
        attributes: {city: "Miami (set child)", state: "Florida (set child)"},
        test: function(cmp) {
            this.checkOutput(cmp, "parent-address",  ["Miami (set child)", "Florida (set child)"]);
            this.checkOutput(cmp, "child-address",  ["Miami (set child)", "Florida (set child)"]);
        }
    }
})
