/**
* This filter applies a pixelate effect making display objects appear 'blocky'
* @class PixelateFilter
* @contructor
*/
Phaser.Filter.Pixelate = function(game) {

    Phaser.Filter.call(this, game);

    this.passes = [this];

    this.uniforms.invert = { type: '1f', value: 0 };
    this.uniforms.pixelSize = { type: '2f', value: { x: 10, y: 10 } };
    this.uniforms.dimensions = { type: '4fv', value: { x: 10000, y: 100, z: 10, w: 10 } };

    this.fragmentSrc = [

        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "uniform vec2 testDim;",
        "uniform vec4 dimensions;",
        "uniform vec2 pixelSize;",
        "uniform sampler2D uSampler;",

        "void main(void)",
        "{",

            "vec2 coord = vTextureCoord;",
            "vec2 size = dimensions.xy/pixelSize;",
            "vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;",
            "gl_FragColor = texture2D(uSampler, color);",
        "}"
    ];
};

Phaser.Filter.Pixelate.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Pixelate.prototype.constructor = Phaser.Filter.Pixelate;

/**
 * This a point that describes the size of the blocs. x is the width of the block and y is the the height
 * @property size
 * @type Point
 */
Object.defineProperty(Phaser.Filter.prototype, 'size', {

    get: function() {

        return this.uniforms.pixelSize.value;

    },

    set: function(value) {

        this.dirty = true;
        this.uniforms.pixelSize.value = value;

    }

});
