ig.module(
    'plusplus.entities.lava'
)
    .requires(
        'plusplus.core.config',
        'plusplus.entities.pain-instagib'
)
    .defines(function() {
        "use strict";

        var _c = ig.CONFIG;

        
        ig.EntityLava = ig.global.EntityLava = ig.EntityPainInstagib.extend( /**@lends ig.EntityLava.prototype */ {

            // editor properties

            _wmDrawBox: false,

            /**
             * @override
             * @default
             */
            frozen: false,

            /**
             * @override
             * @default
             */
            textured: true,

            /**
             * @override
             * @default texture_lava.png
             */
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'texture_lava.png', 16, 16),

            /**
             * @override
             * @default
             */
            animSettings: true,

            /**
             * @override
             * @default
             */
            animFrameTime: 0.25,

            /**
             * @override
             * @default
             */
            animSequenceCount: 2,

            /**
             * @override
             * @default [ 'SOLID', 'SURFACE', 'TOPRIGHT', 'TOPRIGHTROUND', 'TOPLEFT', 'TOPLEFTROUND', 'BOTTOMRIGHT', 'BOTTOMRIGHTROUND', 'BOTTOMLEFT', 'BOTTOMLEFTROUND' ]
             */
            animationTypes: [
                'SOLID',
                'SURFACE',
                'TOPRIGHT',
                'TOPRIGHTROUND',
                'TOPLEFT',
                'TOPLEFTROUND',
                'BOTTOMRIGHT',
                'BOTTOMRIGHTROUND',
                'BOTTOMLEFT',
                'BOTTOMLEFTROUND'
            ]

        });

    });
