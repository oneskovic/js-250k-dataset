define([
    'mout/lang/isFunction'
    , './lib/randomAccessor'
], function instanceOfWrapper(
    isFunction
    , randomAccessor
) {

    'use strict';

    var random = randomAccessor('instanceOfWrapper'),
        $class = '$class_' + random,
        $interface = '$interface_' + random;

    
    function interfaceDescendantOf(interf1, interf2) {
        var x,
            parents = interf1[$interface].parents;

        for (x = parents.length - 1; x >= 0; x -= 1) {
            if (parents[x] === interf2) {
                return true;
            }
            if (interfaceDescendantOf(interf1, parents[x])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if an instance of a class is an instance of an interface.
     *
     * @param {Object}   instance The instance to be checked
     * @param {Function} target   The interface
     *
     * @return {Boolean} True if it is, false otherwise
     */
    function instanceOfInterface(instance, target) {
        var x,
            interfaces = instance.$static[$class].interfaces;

        for (x = interfaces.length - 1; x >= 0; x -= 1) {
            if (interfaces[x] === target || interfaceDescendantOf(interfaces[x], target)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Custom instanceOf that also works on interfaces.
     *
     * @param {Object}   instance The instance to be checked
     * @param {Function} target   The target
     *
     * @return {Boolean} True if it is a valid instance of target, false otherwise
     */
    function instanceOf(instance, target) {
        if (!isFunction(target)) {
            return false;
        }

        if (instance instanceof target) {
            return true;
        }

        if (instance && instance.$static && instance.$static[$class] && target && target[$interface]) {
            return instanceOfInterface(instance, target);
        }

        return false;
    }

    return instanceOf;
});