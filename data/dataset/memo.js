var db = require('ripple/db'),
    select = require('ripple/platform/webworks.core/2.0.0/select'),
    _self;

function _get() {
    return db.retrieveObject("webworks-pim-memo-list") || {};
}

function _do(func) {
    var memos = _get();
    func(memos);
    db.saveObject("webworks-pim-memo-list", memos);
}

_self = {
    find: function (get, post) {
        var memos = select.from(_get())
                    .orderBy(post.orderBy, post.isAscending === false ? "desc" : "asc")
                    .max(post.maxReturn)
                    .where(post.filter);
        return {code: 1, data: memos};
    },
    remove: function (get, post) {
        _do(function (memos) {
            if (!memos[get.uid]) {
                throw "attempting to delete a non existant memo with uid: " + get.uid;
            }
            delete memos[get.uid];
        });
        return {code: 1};
    },
    save: function (get, post) {
        _do(function (memos) {
            memos[post.memo.uid] = post.memo;
        });
        return {code: 1};
    }
};

module.exports = _self;
