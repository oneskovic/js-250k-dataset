// The class this file defines and its required classes
R.Engine.define({
    "class":"R.components.Logic",
    "requires":[
        "R.components.Base"
    ]
});

/**
 * @class Logic components are sort of a catch-all of components.  They aren't
 *        any one of the specific types, so they fall under the type of LOGIC.
 *        Logic components are in the middle of the importance scale, so they
 *        are processed after input and transformations, but before collision and
 *        rendering.  This makes them ideal for additional processing, such as the
 *        {@link R.components.HostComponent}.
 *
 * @param name {String} The name of the component
 * @param [priority=1.0] {Number} The priority of the component
 * @extends R.components.Base
 * @constructor
 * @description Creates a logic component.
 */
R.components.Logic = function () {
    "use strict";
    return R.components.Base.extend(/** @scope R.components.Logic.prototype */{

        /**
         * @private
         */
        constructor:function (name, priority) {
            this.base(name, R.components.Base.TYPE_LOGIC, priority || 1.0);
        }
    }, /** @scope R.components.Logic.prototype */{
        /**
         * Get the class name of this object
         * @return {String} "R.components.Logic"
         */
        getClassName:function () {
            return "R.components.Logic";
        }
    });
}