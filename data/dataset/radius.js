var fun   = require("../../../uki-core/function"),
    env   = require("../../../uki-core/env"),
    view  = require("../../../uki-core/view"),
    build = require("../../../uki-core/builder").build,

    Checkbox = require("../../../uki-fb/view/checkbox").Checkbox;


var Radius = view.newClass('ads.control.Radius', Checkbox, {

    _createDom: function(initArgs) {
        Checkbox.prototype._createDom.call(this, { tagName: 'span' });

        this._label.appendChild(
            env.doc.createTextNode('Include cities within '));

        this._select = build({ view: 'Select', parent: this, options: [
            { text: 10, value: 10 },
            { text: 25, value: 25 },
            { text: 50, value: 50 }
        ] })[0];

        this._label.appendChild(this._select.dom());
        this._label.appendChild(env.doc.createTextNode(' miles.'));
    },

    selectBinding: fun.newDelegateProp('_select', 'binding')
});


exports.Radius = Radius;
