Ext.define("Ext.draw.modifier.Modifier", {
    config: {
        /**
         * @cfg {Ext.draw.modifier.Modifier} previous Previous modifier that receives
         * the push-down changes.
         */
        previous: null,

        /**
         * @cfg {Ext.draw.modifier.Modifier} next Next modifier that receives the
         * pop-up changes.
         */
        next: null,

        /**
         * @cfg {Ext.draw.sprite.Sprite} sprite The sprite to which the modifier belongs.
         */
        sprite: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    updateNext: function (next) {
        if (next) {
            next.setPrevious(this);
        }
    },

    updatePrev: function (prev) {
        if (prev) {
            prev.setNext    (this);
        }
    },

    /**
     * Validate attribute set before use.
     *
     * @param {Object} attr The attribute to be validated. Note that it may be already initialized, so do
     * not override properties that have already been used.
     */
    prepareAttributes: function (attr) {
        if (this._previous) {
            this._previous.prepareAttributes(attr);
        }
    },

    /**
     * Invoked when changes need to be popped up to the top.
     * @param {Object} attributes The source attributes.
     * @param {Object} changes The changes to be popped up.
     */
    popUp: function (attributes, changes) {
        if (this._next) {
            this._next.popUp(attributes, changes);
        } else {
            Ext.apply(attributes, changes);
        }
    },

    /**
     * Invoked when changes need to be pushed down to the sprite.
     * @param {Object} attr The source attributes.
     * @param {Object} changes The changes to make. This object might be changed unexpectedly inside the method.
     * @return {Mixed}
     */
    pushDown: function (attr, changes) {
        if (this._previous) {
            return this._previous.pushDown(attr, changes);
        } else {
            for (var name in changes) {
                if (changes[name] === attr[name]) {
                    delete changes[name];
                }
            }
            return changes;
        }
    }
});
