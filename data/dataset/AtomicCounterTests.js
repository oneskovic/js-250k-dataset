var assert = require('assert');
var Scule = require('../lib/com.scule');

describe('AtomicCounter', function() {
    describe('initialize', function() {
        it('should set the counter to 999', function() {
            var counter = Scule.getAtomicCounter(999);
            assert.equal(counter.getCount(), 999);              
        });
        it('should set the counter to 0 when undefined is passed', function() {
            var counter = Scule.getAtomicCounter(undefined);
            assert.equal(counter.getCount(), 0);           
        });
        it('should throw an exception when trying to use a non-number in the constructor', function() {
            var exception = false;
            try {
                var counter = Scule.getAtomicCounter('foo');
            } catch (e) {
                exception = true;
            }
            assert.equal(true, exception);        
        });       
    });
    describe('increment', function() {
        it('should increment the counter by 1', function() {
            var counter = Scule.getAtomicCounter(1);
            counter.increment(1);
            assert.equal(counter.getCount(), 2);              
        });
        it('should increment the counter by 11', function() {
            var counter = Scule.getAtomicCounter(1);
            counter.increment(11);
            assert.equal(counter.getCount(), 12);              
        });
        it('should increment the counter by 1 when undefined is passed', function() {
            var counter = Scule.getAtomicCounter(1);
            counter.increment(undefined);
            assert.equal(counter.getCount(), 2);           
        });
        it('should throw an exception when trying to use a non-number increment', function() {
            var exception = false;
            try {
                var counter = Scule.getAtomicCounter(1);
                counter.increment('foo');
            } catch (e) {
                exception = true;
            }
            assert.equal(true, exception);        
        });        
    });
    describe('decrement', function() {
        it('should decrement the counter by 1', function() {
            var counter = Scule.getAtomicCounter(2);
            counter.decrement(1);
            assert.equal(counter.getCount(), 1);               
        });
        it('should decrement the counter by 6', function() {
            var counter = Scule.getAtomicCounter(12);
            counter.decrement(6);
            assert.equal(counter.getCount(), 6);               
        });
        it('should increment the counter by 1 when undefined is passed', function() {
            var counter = Scule.getAtomicCounter(1);
            counter.decrement(undefined);
            assert.equal(counter.getCount(), 0);           
        });
        it('should throw an exception when trying to use a non-number increment', function() {
            var exception = false;
            try {
                var counter = Scule.getAtomicCounter(1);
                counter.decrement('foo');
            } catch (e) {
                exception = true;
            }
            assert.equal(true, exception);        
        });        
        
    });
});