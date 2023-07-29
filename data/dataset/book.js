var Class = require('../../common/class');

module.exports = function(db) {
    var Q = require('q'),
        _ = require('underscore');

    var Book = Class.extend({
        init: function(json) {
            _.extend(this, json || {});
        }
    });

    Book.get = function(bookId) {
        var deferred = Q.defer();

        db.query('select * from ib_books where id=?', [bookId], function(err, results) {
            if(err) {
                deferred.reject(err);
                return;
            }

            if(results.length === 0) {
                deferred.reject('Book not found.');
                return;
            }

            deferred.resolve(new Book(results[0]));
        });

        return deferred.promise;
    };

    return Book;
};