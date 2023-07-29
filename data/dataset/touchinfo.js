// The class this file defines and its required classes
R.Engine.define({
    "class":"R.struct.TouchInfo",
    "requires":[
        "R.struct.MouseInfo",
        "R.struct.Touch"
    ]
});

/**
 * @class An object which contains information about touch gestures in relation to
 *        a rendering context.
 *
 * @extends R.struct.MouseInfo
 * @constructor
 * @description Creates a touch data structure.
 */
R.struct.TouchInfo = function () {
    return R.struct.MouseInfo.extend(/** @scope R.struct.TouchInfo.prototype */{

        /**
         * All touches.  See {@link R.struct.Touch} for more info.
         * @type {Array}
         */
        touches:null,

        /** @private */
        constructor:function () {
            this.touches = [];
            this.base("TouchInfo");
        },

        /**
         * Release the collision data object back into the pool for reuse.
         */
        release:function () {
            this.base();
            this.touches = null;
        }

    }, {
        getClassName:function () {
            return "R.struct.TouchInfo";
        },

        /**
         * Process the touches and pass an array of touch objects to be handled by the
         * host object.
         * @private
         */
        processTouches:function (eventObj) {
            var touches = [];
            if (eventObj.touches) {
                for (var i = 0; i < eventObj.touches.length; i++) {
                    touches.push(new R.struct.Touch(eventObj.touches[i]));
                }
            }
            return touches;
        }

    });
};

