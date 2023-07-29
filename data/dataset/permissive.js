'use strict';

var assert, modulePath;

assert = require('chai').assert;

modulePath = '../../src/validators/permissive';

suite('validators/permissive:', function () {
    var log;

    setup(function () {
        log = {};
    });

    teardown(function () {
        log = undefined;
    });

    test('require does not throw', function () {
        assert.doesNotThrow(function () {
            require(modulePath);
        });
    });

    test('require returns object', function () {
        assert.isObject(require(modulePath));
    });

    suite('require:', function () {
        var permissive;

        setup(function () {
            permissive = require(modulePath);
        });

        teardown(function () {
            permissive = undefined;
        });

        test('initialise function is exported', function () {
            assert.isFunction(permissive.initialise);
        });

        test('initialise does not throw', function () {
            assert.doesNotThrow(function () {
                permissive.initialise();
            });
        });

        suite('call initialise:', function () {
            var validator;

            setup(function () {
                validator = permissive.initialise();
            });

            teardown(function () {
                validator = undefined;
            });

            test('initialise returned function', function () {
                assert.isFunction(validator);
            });

            test('validator does not throw', function () {
                assert.doesNotThrow(function () {
                    validator();
                });
            });

            suite('call validator:', function () {
                var result;

                setup(function () {
                    result = validator();
                });

                teardown(function () {
                    result = undefined;
                });

                test('result was correct', function () {
                    assert.isTrue(result);
                });
            });

            suite('call validator with data:', function () {
                var result;

                setup(function () {
                    result = validator({
                        foo: 'bar',
                        baz: 'qux'
                    });
                });

                teardown(function () {
                    result = undefined;
                });

                test('result was correct', function () {
                    assert.isTrue(result);
                });
            });
        });
    });
});

