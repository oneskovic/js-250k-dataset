Aria.classDefinition({
    $classpath : "test.aria.core.jsonValidator.RecursiveBeansTest",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.core.JsonValidator", "test.aria.core.jsonValidator.RecursiveBeans"],
    $prototype : {

        _initialData : function () {
            return {
                value1 : 1,
                subTrees : [{
                            value2 : 0
                        }, {
                            value1 : 4,
                            subTrees : [{
                                        subTrees : [{
                                                    subTrees : []
                                                }, {
                                                    value1 : 2
                                                }]
                                    }]
                        }]
            };
        },

        _normalizedData : function () {
            return {
                value1 : 1,
                value2 : 7,
                subTrees : [{
                            value1 : 3,
                            value2 : 0,
                            subTrees : []
                        }, {
                            value1 : 4,
                            value2 : 7,
                            subTrees : [{
                                        value1 : 3,
                                        value2 : 7,
                                        subTrees : [{
                                                    value1 : 3,
                                                    value2 : 7,
                                                    subTrees : []
                                                }, {
                                                    value1 : 2,
                                                    value2 : 7,
                                                    subTrees : []
                                                }]
                                    }]
                        }]
            };
        },

        _checkNormalization : function () {
            var param = {
                json : this._initialData(),
                beanName : "test.aria.core.jsonValidator.RecursiveBeans.Tree"
            };
            var res = aria.core.JsonValidator.normalize(param);
            this.assertJsonEquals(param.json, this._normalizedData());
        },

        testExecuteNormalize : function () {
            // test in slow mode:
            this.assertTrue(aria.core.JsonValidator._options.checkEnabled, "This test is expected to be run with aria.core.JsonValidator._options.checkEnabled = true");
            this._checkNormalization();

            // test in fast mode:
            aria.core.JsonValidator._options.checkEnabled = false;
            this._checkNormalization();

            // reset initial mode:
            aria.core.JsonValidator._options.checkEnabled = true;
        }
    }
});