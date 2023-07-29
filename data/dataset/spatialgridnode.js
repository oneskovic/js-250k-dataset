// The class this file defines and its required classes
R.Engine.define({
    "class":"R.collision.broadphase.SpatialGridNode",
    "requires":[
        "R.collision.broadphase.AbstractCollisionNode"
    ]
});

/**
 * @class A single node within a <tt>R.collision.broadphase.SpatialGrid</tt>.  When the collision model is
 *        updated, the nodes within the grid will be updated to reflect the
 *        objects within them.  A node defines a single rectangle within the
 *        entire {@link R.collision.broadphase.SpatialGrid}
 *
 * @extends R.collision.broadphase.AbstractCollisionNode
 * @constructor
 * @description Create an instance of an <tt>R.collision.broadphase.SpatialNode</tt> for use within a {@link R.collision.broadphase.SpatialGrid}
 * @param rect {R.math.Rectangle2D} The rectangle which defines this node.
 */
R.collision.broadphase.SpatialGridNode = function () {
    "use strict";
    return R.collision.broadphase.AbstractCollisionNode.extend(/** @scope R.collision.broadphase.SpatialGridNode.prototype */{

        rect:null,

        /** @private */
        constructor:function (rect) {
            this.base();
            this.rect = rect;
        },

        /**
         * Get the rectangle which defines this node.
         * @return {R.math.Rectangle2D}
         */
        getRect:function () {
            return this.rect
        },

        /**
         * Returns true if the spatial node contains the point specified.
         * @param point {R.math.Point2D} The point to check
         * @return {Boolean}
         */
        contains:function (point) {
            return this.getRect().containsPoint(point);
        }

    }, /** @scope R.collision.broadphase.SpatialGridNode.prototype */ {

        /**
         * Get the class name of this object
         *
         * @return {String} "R.collision.broadphase.SpatialGridNode"
         */
        getClassName:function () {
            return "R.collision.broadphase.SpatialGridNode";
        }

    });

}