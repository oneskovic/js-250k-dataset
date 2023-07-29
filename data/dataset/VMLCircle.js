VMLCircle = function()
{
	VMLCircle.superclass.constructor.apply(this, arguments);
};

VMLCircle.NAME = "circle";

Y.extend(VMLCircle, VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "oval"
});

VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {
	/**
	 * Radius for the circle.
	 *
	 * @config radius
	 * @type Number
	 */
	radius: {
		lazyAdd: false,

		value: 0
	},

	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
        setter: function(val)
        {
            this.set("radius", val/2);
            return val;
        },

		getter: function()
		{
			var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			return val;
		}
	},

	/**
	 * Indicates the height of the shape
	 *
	 * @config height
	 * @type Number
	 */
	height: {
        setter: function(val)
        {
            this.set("radius", val/2);
            return val;
        },

		getter: function()
		{
			var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			return val;
		}
	}
});
Y.VMLCircle = VMLCircle;
