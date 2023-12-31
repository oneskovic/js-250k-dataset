// The class this file defines and its required classes
R.Engine.define({
    "class":"R.components.physics.WeldJoint",
    "requires":[
        "R.components.physics.BaseJoint",
        "R.physics.Simulation",
        "R.math.Point2D",
        "R.math.Vector2D",
        "R.math.Rectangle2D",
        "R.math.Math2D"
    ]
});

/**
 * @class A weld joint effectively welds two bodies together at a given point
 *        in a {@link R.physics.Simulation}.
 *
 * @param name {String} Name of the component
 * @param body1 {R.components.physics.BaseBody} The first body for the joint
 * @param body2 {R.components.physics.BaseBody} The second body for the joint
 * @param [anchor] {R.math.Point2D} The anchor point on body1, or <code>null</code>
 *        to use the body's position
 *
 * @extends R.components.physics.BaseJoint
 * @constructor
 * @description Creates a weld joint between two physical bodies.  The location of the weld
 *              is described by the anchor position.  When the first or second body is acted
 *              upon, the other body is also affected.
 */
R.components.physics.WeldJoint = function () {
    return R.components.physics.BaseJoint.extend(/** @scope R.components.physics.WeldJoint.prototype */{

        anchor:null,

        /**
         * @private
         */
        constructor:function (name, body1, body2, anchor) {
            var jointDef = new Box2D.Dynamics.Joints.b2WeldJointDef();
            if (anchor) {
                this.anchor = R.math.Point2D.create(anchor).div(R.physics.Simulation.WORLD_SIZE);
            }

            this.base(name || "WeldJoint", body1, body2, jointDef);
        },

        /**
         * Offset the joint's anchors by the given point
         * @param pt {R.math.Point2D} The offset amount
         */
        offset:function (pt) {
            if (this.anchor) {
                var ofs = R.clone(pt).div(R.physics.Simulation.WORLD_SIZE);
                this.anchor.add(ofs);
                ofs.destroy();
            }
        },

        /**
         * When simulation starts set the anchor point and bodies.
         * @private
         */
        startSimulation:function () {
            if (!this.getSimulation()) {
                var anchor = new Box2D.Common.Math.b2Vec2();
                if (this.anchor) {
                    anchor.Set(this.anchor.x, this.anchor.y);
                } else {
                    var pos = R.clone(this.getBody1().getPosition()).div(R.physics.Simulation.WORLD_SIZE);
                    anchor.Set(pos.x, pos.y);
                    pos.destroy();
                }
                this.getJointDef().Initialize(this.getBody1().getBody(), this.getBody2().getBody(), anchor);
            }

            this.base();
        }

    }, { /** @scope R.components.physics.WeldJoint.prototype */

        /**
         * Get the class name of this object
         *
         * @return {String} "R.components.physics.WeldJoint"
         */
        getClassName:function () {
            return "R.components.physics.WeldJoint";
        }
    });
};