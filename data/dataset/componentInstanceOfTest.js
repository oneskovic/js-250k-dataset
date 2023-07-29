({
    /**
     */
    testHasSingleInterface: {
        test: function(component){
            var cmp = component.find("basic");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceChild"), "extra intf");
        }
    },

    /**
     */
    testHasSingleExtendedInterface: {
        test: function(component){
            var cmp = component.find("child");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterfaceChild"), "missing intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing parent intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceGrandchild"), "extra intf");
        }
    },

    /**
     */
    testHasSingleExtraExtendedInterface: {
        test: function(component){
            var cmp = component.find("grandchild");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterfaceGrandchild"), "missing intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterfaceChild"), "missing parent intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing grandparent intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterface2"), "extra intf");
        }
    },

    /**
     */
    testExtendsFromSingleExtendedInterface: {
        test: function(component){
            var cmp = component.find("stepchild");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterfaceChild"), "missing intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing parent intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface2"), "missing additional intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceGrandchild"), "extra intf");
        }
    },

    /**
     */
    testExtraExtendsFromSingleExtendedInterface: {
        test: function(component){
            var cmp = component.find("stepgrandchild");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterfaceChild"), "missing intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing parent intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface2"), "missing additional intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceGrandchild"), "extra intf");
        }
    },

    /**
     */
    testHasMultipleInterfaces: {
        test: function(component){
            var cmp = component.find("multiple");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface"), "missing first intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:testInterface2"), "missing second intf");
            aura.test.assertTrue(cmp.isInstanceOf("auratest:test_Instantiate_Interface"), "missing third intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceChild"), "extra child intf");
        }
    },

    /**
     */
    testInvalidArguments: {
        test: function(component){
            aura.test.assertFalse(component.isInstanceOf(), "no input");
            aura.test.assertFalse(component.isInstanceOf(null), "null input");
            aura.test.assertFalse(component.isInstanceOf(undefined), "undefined input");
            aura.test.assertFalse(component.isInstanceOf(""), "empty string");
            aura.test.assertFalse(component.isInstanceOf("x"), "invalid name");
            aura.test.assertFalse(component.isInstanceOf("blaggah:testUnknownInterface"), "unknown namespace");
            aura.test.assertFalse(component.isInstanceOf("auratest:testUnknownInterface"), "unknown component");
        }
    },

    /**
     * isInstanceOf works for component with no interfaces.
     */
    testNoInterfaces: {
        test: function(component){
            var cmp = component.find("none");
            $A.log(cmp.getDef());
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterface"), "unexpected first intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterface2"), "unexpected second intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:test_Instantiate_Interface"), "unexpected third intf");
            aura.test.assertFalse(cmp.isInstanceOf("auratest:testInterfaceChild"), "unexpected child intf");
        }
    }
})
