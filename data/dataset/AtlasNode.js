'use strict'

var SpriteBatchNode = require('./BatchNode').SpriteBatchNode,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    geo   = require('geometry')


function AtlasNode (opts) {
    AtlasNode.superclass.constructor.call(this, opts)

    this.itemWidth = opts.itemWidth
    this.itemHeight = opts.itemHeight

    this.textureAtlas = new TextureAtlas({file: opts.file, capacity: opts.itemsToRender})


    this._calculateMaxItems()
}

AtlasNode.inherit(SpriteBatchNode,  {
    /**
     * Characters per row
     * @type Integer
     */
    itemsPerRow: 0,

    /**
     * Characters per column
     * @type Integer
     */
    itemsPerColumn: 0,

    /**
     * Width of a character
     * @type Integer
     */
    itemWidth: 0,

    /**
     * Height of a character
     * @type Integer
     */
    itemHeight: 0,


    /**
     * @type cocos.TextureAtlas
     */
    textureAtlas: null,

    updateAtlasValues: function () {
        throw "cocos.nodes.AtlasNode:Abstract - updateAtlasValue not overriden"
    },

    _calculateMaxItems: function () {
        var s = this.textureAtlas.texture.contentSize
        this.itemsPerColumn = s.height / this.itemHeight
        this.itemsPerRow = s.width / this.itemWidth
    }
})

exports.AtlasNode = AtlasNode

// vim:et:st=4:fdm=marker:fdl=0:fdc=1
