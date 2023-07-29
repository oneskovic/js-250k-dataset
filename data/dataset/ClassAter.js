/**
 * Simple class used to test class definition
 */
Aria.classDefinition({
    $class : 'ClassAter',
    $package : 'test.aria.test',
    $classpath : 'test.aria.test.ClassAter',

    $constructor : function (optValueA) {
        if (optValueA != null) {
            this.propertyA = optValueA;
        } else {
            this.propertyA = 'valueA';
        }
        this.count = 0;
    },

    $destructor : function () {
        this.propertyA = null;
        this.count = null;
    },

    $prototype : {
        /**
         * Change count
         */
        methodA1 : function () {
            this.count++;
        },

        /**
         * @param {String} arg string argument
         * @return {String}
         */
        methodA2 : function (arg) {
            return arg + 'mA2';
        }
    }
});
