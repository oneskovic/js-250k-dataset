function hueSaturation(hue, saturation) {
    gl.hueSaturation = gl.hueSaturation || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float hue;\
        uniform float saturation;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            \
            /* hue adjustment, wolfram alpha: RotationTransform[angle, {1, 1, 1}][{x, y, z}] */\
            float angle = hue * 3.14159265;\
            float s = sin(angle), c = cos(angle);\
            vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;\
            float len = length(color.rgb);\
            color.rgb = vec3(\
                dot(color.rgb, weights.xyz),\
                dot(color.rgb, weights.zxy),\
                dot(color.rgb, weights.yzx)\
            );\
            \
            /* saturation adjustment */\
            float average = (color.r + color.g + color.b) / 3.0;\
            if (saturation > 0.0) {\
                color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));\
            } else {\
                color.rgb += (average - color.rgb) * (-saturation);\
            }\
            \
            gl_FragColor = color;\
        }\
    ');

    simpleShader.call(this, gl.hueSaturation, {
        hue: clamp(-1, hue, 1),
        saturation: clamp(-1, saturation, 1)
    });

    return this;
}
