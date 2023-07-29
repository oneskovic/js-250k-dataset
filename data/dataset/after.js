define(function(require, exports, module) {
    var Engine  = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');

    var mySurface = new Surface({
        size: [undefined, 100],
        properties: {
            backgroundColor: '#fa5c4f',
            lineHeight: '100px',
            textAlign: 'center',
            color: '#eee'
        },
        content: 'Take only the 5th click into account.'
    });

    var myModifier = new StateModifier({
        origin: [0, 0],
        align: [0, 0]
    });

    var mainContext = Engine.createContext();
    mainContext.add(myModifier).add(mySurface);

    var fn = Utility.after(5, function() {
        alert('Was called on 5th try');
    });

    Engine.on('click', fn);
});
