({

    TEST_ARRAY : ['red',
                  'green',
                  'blue',
                  'green',
                  'yellow'],

    EMPTY_ARRAY : [],

    testArrayIndex : {
        test : function(cmp) {
            $A.test.assertTrue(this.TEST_ARRAY.indexOf('red') === 0, "Wrong index for first array element returned");
            $A.test.assertTrue(this.TEST_ARRAY.indexOf('yellow') === 4, "Wrong index for last array element returned");
            $A.test.assertTrue(this.TEST_ARRAY.indexOf('nonexistent') === -1, "Element not found in array should return -1");
            $A.test.assertTrue(this.TEST_ARRAY.indexOf('') === -1, "Index returned on search for empty string");
            $A.test.assertTrue(this.TEST_ARRAY.indexOf(null) === -1, "Index returned on search for null");
            $A.test.assertTrue(this.TEST_ARRAY.indexOf(undefined) === -1, "Index returned on search for undefined");
        }
    },

    testArrayIndexOnEmptyArray : {
        test : function(cmp) {
            $A.test.assertTrue(this.EMPTY_ARRAY.indexOf('red') === -1, "Element found in empty array");
            $A.test.assertTrue(this.EMPTY_ARRAY.indexOf('') === -1, "Element found in empty array");
        }
    },

    testArrayIndexOnArrayFromComponent : {
        test : function(cmp) {
            var array = cmp.get("v.array");
            $A.test.assertTrue(array.indexOf('red') === 0, "Wrong index for first array element returned");
            $A.test.assertTrue(array.indexOf('yellow') === 4, "Wrong index for last array element returned");
            $A.test.assertTrue(array.indexOf('nonexistent') === -1, "Element not found in array should return -1");
            $A.test.assertTrue(array.indexOf('') === -1, "Index returned for empty search");
            $A.test.assertTrue(array.indexOf(null) === -1, "Index returned for null search");
            $A.test.assertTrue(array.indexOf(undefined) === -1, "Index returned for undefined search");

        }
    }
})

