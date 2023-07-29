'use strict'

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp


function SpriteFrame (opts) {
    SpriteFrame.superclass.constructor.call(this, opts)

    this.texture      = opts.texture
    this.rect         = opts.rect
    this.rotated      = !!opts.rotate
    this.offset       = opts.offset || ccp(0, 0)
    this.originalSize = opts.originalSize || util.copy(this.rect.size)
}

SpriteFrame.inherit(Object, /** @lends cocos.SpriteFrame# */ {
    rect: null,
    rotated: false,
    offset: null,
    originalSize: null,
    texture: null,

    /**
     * @ignore
     */
    toString: function () {
        return "[object SpriteFrame | TextureName=" + this.texture.name + ", Rect = (" + this.rect.origin.x + ", " + this.rect.origin.y + ", " + this.rect.size.width + ", " + this.rect.size.height + ")]"
    },

    /**
     * Make a copy of this frame
     *
     * @returns {cocos.SpriteFrame} Exact copy of this object
     */
    copy: function () {
        return new SpriteFrame({rect: this.rect, rotated: this.rotated, offset: this.offset, originalSize: this.originalSize, texture: this.texture})
    }

})

exports.SpriteFrame = SpriteFrame

// vim:et:st=4:fdm=marker:fdl=0:fdc=1
