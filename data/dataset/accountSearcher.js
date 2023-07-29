var fun = require("../../uki-core/function");


var Searcher = fun.newClass({
    
    init: function(accs) {
        this._accs = accs;
    },

    search: function(query, limit) {
        limit = limit || 10;
        var d = this._accs,
            r = [],
            l = d.length,
            i = 0,
            item;

        for (; i < l && limit > 0; i++) {
            item = d[i];
            if ((item.id() + '').indexOf(query) === 0) {
                r.push({ id: item.id(), text: item.id() });
                limit--;
            }
        }
        return r;
    }
});


exports.Searcher = Searcher;
