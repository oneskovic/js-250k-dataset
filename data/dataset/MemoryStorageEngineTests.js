var assert = require('assert');
var Scule = require('../lib/com.scule');

var storage = Scule.getMemoryStorageEngine({
    collection:'unittest',
    secret: 'mysecretkey'
});

describe('MemoryStorageEngine', function() {
    it('should test writes', function() {
        var object = {
            foo: 'bar',
            bar: 'foo',
            arr: [1, 3, 2, 4, 5, 7],
            obj: {
                me: 'string'
            }
        }
        storage.write('unittest', object, function(o) {
            assert.equal(true, '__scule_collection__unittest' in storage.storage);
        });        
    });
    it('should test reads', function() {
        storage.read('unittest', function(o) {
            assert.ok(o);
            assert.equal(o.foo, 'bar');
            assert.equal(o.bar, 'foo');
            assert.equal(o.arr.length, 6);
            assert.equal(o.arr[5], 7);
            assert.equal(o.obj.me, 'string');
        });          
    });
});