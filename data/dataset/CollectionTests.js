var assert = require('assert');
var Scule = require('../lib/com.scule');

describe('CollectionFactory', function() {
    it('should verify the factory pattern is correctly implemented', function() {
        Scule.dropAll();
        var collection = Scule.factoryCollection('scule+dummy://unittest');
        collection.clear();
        for(var i=0; i < 1000; i++) {
            var r = i%10;
            collection.save({
               a: {
                   b:r
               },
               bar:'foo'+r,
               arr: [r, r+1, r+2, r+3],
               scl: r
            });
        }
        assert.equal(collection.getLength(), 1000);
        assert.ok(collection.getLastInsertId());
        collection.clear();
        assert.equal(collection.getLength(), 0);        
    });
    it('should factory a NodeJS disk based collection', function() {
        Scule.dropAll();
        var collection = Scule.factoryCollection('scule+nodejs://collection', {secret:'test', path:'/tmp'});
        setTimeout(function() {
            collection.clear();
            for(var i=0; i < 5; i++) {
                var r = i%10;
                collection.save({
                   a: {
                       b:r
                   },
                   bar:'foo'+r,
                   arr: [r, r+1, r+2, r+3],
                   scl: r
                });
            }
            assert.equal(5, collection.getLength());
            assert.ok(collection.getLastInsertId());
            collection.commit();        
        }, 500);        
    });
    it('should merge two collections', function() {
        Scule.dropAll();
        var collection1 = Scule.factoryCollection('scule+dummy://unittest1');
        var collection2 = Scule.factoryCollection('scule+dummy://unittest2');  
        collection1.clear();
        collection2.clear();
        for(var i=0; i < 1000; i++) {
            var r = i%10;
            var o = {
               a:{
                   b:Scule.global.functions.randomFromTo(1, 10)
               },
               bar:'foo'+r,
               arr:[r, r+1, r+2, r+3],
               scl:i
            };
            collection1.save(o);
            collection2.save(o);
        }
        collection1.merge(collection2);
        assert.equal(collection1.getLength(), 1000);
        for(var i=0; i < 1000; i++) {
            var r = i%10;
            var o = {
               a:{
                   b:Scule.global.functions.randomFromTo(1, 10)
               },
               bar:'foo'+r,
               arr:[r, r+1, r+2, r+3],
               scl:i
            };
            collection2.save(o);
        } 
        collection1.merge(collection2);
        assert.equal(collection1.getLength(), 2000);         
    });
});