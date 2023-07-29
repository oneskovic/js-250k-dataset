// The class this file defines and its required classes
R.Engine.define({
    "class":"R.rendercontexts.HTMLDivContext",
    "requires":[
        "R.rendercontexts.HTMLElementContext",
        "R.math.Rectangle2D"
    ]
});

/**
 * @class A simple extension of the {@link R.rendercontexts.HTMLElementContext} which uses a DIV
 * element to represent the context.  This is just a convenience method.
 * <p/>
 *
 * @extends R.rendercontexts.HTMLElementContext
 * @constructor
 * @description Create a new instance of a context drawn on a <tt>div</tt> element.
 * @param name {String} The name of the context
 * @param contextWidth {Number} The width (in pixels) of the context.
 * @param contextHeight {Number} The height (in pixels) of the context.
 */
R.rendercontexts.HTMLDivContext = function () {
    return R.rendercontexts.HTMLElementContext.extend(/** @scope R.rendercontexts.HTMLDivContext.prototype */{

        /** @private */
        constructor:function (name, contextWidth, contextHeight) {
            var ctx = $("<div>").css({
                width:contextWidth,
                height:contextHeight,
                position:"absolute",
                overflow:"hidden"
            });
            this.base(name || "HTMLDivContext", ctx);
            this.setViewport(R.math.Rectangle2D.create(0, 0, contextWidth, contextHeight));
        }

    }, /** @scope R.rendercontexts.HTMLDivContext.prototype */ {

        /**
         * Get the class name of this object
         *
         * @return {String} "R.rendercontexts.HTMLDivContext"
         */
        getClassName:function () {
            return "R.rendercontexts.HTMLDivContext";
        }
    });

}