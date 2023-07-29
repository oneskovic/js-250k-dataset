var Scule = require('../lib/com.scule');

exports['test QueryEngine'] = function(beforeExit, assert) {
    
    var engine = Scule.getQueryEngine();
    
    assert.equal(true, engine.$eq(new Date(1372395600 * 1000), new Date(1372395600 * 1000)));
    assert.equal(true, engine.$eq(new Date(1372395600 * 1000), Scule.getObjectDate(1372395600, 0)));
    assert.equal(true, engine.$eq(Scule.getObjectDate(1372395600, 0), new Date(1372395600 * 1000)));
    assert.equal(true, engine.$eq(Scule.getObjectDate(1372395600, 0), Scule.getObjectDate(1372395600, 0)));
    assert.equal(false, engine.$eq(Scule.getObjectDate(1372395600, 300), Scule.getObjectDate(1372395600, 0)));
    assert.equal(false, engine.$eq(new Date(1372395631 * 1000), Scule.getObjectDate(1372395630, 0)));
    
    assert.equal(true, engine.$eq(3, 3));
    assert.equal(true, engine.$eq(0, 0));
    assert.equal(true, engine.$eq(-3, -3));
    assert.equal(true, engine.$eq(null, null));
    assert.equal(true, engine.$eq('a', 'a'));
    assert.equal(true, engine.$eq('abc', 'abc'));
    assert.equal(true, engine.$eq('abc', /^abc$/));
    assert.equal(false, engine.$eq(3, 0));
    assert.equal(false, engine.$eq('a', 'b'));
    assert.equal(false, engine.$eq('bac', 'abc'));
    assert.equal(false, engine.$eq('cac', /^abc$/));
    
    assert.equal(false, engine.$ne(new Date(1372395600 * 1000), new Date(1372395600 * 1000)));
    assert.equal(false, engine.$ne(new Date(1372395600 * 1000), Scule.getObjectDate(1372395600, 0)));
    assert.equal(false, engine.$ne(Scule.getObjectDate(1372395600, 0), new Date(1372395600 * 1000)));
    assert.equal(false, engine.$ne(Scule.getObjectDate(1372395600, 0), Scule.getObjectDate(1372395600, 0)));
    assert.equal(true, engine.$ne(Scule.getObjectDate(1372395600, 300), Scule.getObjectDate(1372395600, 0)));
    assert.equal(true, engine.$ne(new Date(1372395631 * 1000), Scule.getObjectDate(1372395630, 0)));
    
    assert.equal(false, engine.$ne(3, 3));
    assert.equal(false, engine.$ne(0, 0));
    assert.equal(false, engine.$ne(-3, -3));
    assert.equal(false, engine.$ne(null, null));
    assert.equal(false, engine.$ne('a', 'a'));
    assert.equal(false, engine.$ne('abc', 'abc'));
    assert.equal(false, engine.$ne('abc', /^abc$/));
    assert.equal(true, engine.$ne(3, 0));
    assert.equal(true, engine.$ne('a', 'b'));
    assert.equal(true, engine.$ne('bac', 'abc'));
    assert.equal(true, engine.$ne('cac', /^abc$/));    
    
    assert.equal(true, engine.$in(1, [2, 3, 1, 5]));
    assert.equal(true, engine.$in('a', [2, 'c', 'a', 3, 1, 5]));
    assert.equal(true, engine.$in(null, [2, null, 3, 1, 5]));
    assert.equal(true, engine.$in('abc', [2, null, 3, /^ab/, 5]));
    assert.equal(true, engine.$in(Scule.getObjectDate(1372395600, 0), [2, new Date(1372395600 * 1000), 3, 1, 5]));
    assert.equal(true, engine.$in(Scule.getObjectDate(1372395600, 0), [2, Scule.getObjectDate(1372395600, 0), 3, 1, 5]));
    assert.equal(true, engine.$in(new Date(1372395600 * 1000), [2, new Date(1372395600 * 1000), 3, 1, 5]));

    assert.equal(false, engine.$nin(1, [2, 3, 1, 5]));
    assert.equal(false, engine.$nin('a', [2, 'c', 'a', 3, 1, 5]));
    assert.equal(false, engine.$nin(null, [2, null, 3, 1, 5]));
    assert.equal(false, engine.$nin('abc', [2, null, 3, /^ab/, 5]));
    assert.equal(false, engine.$nin(Scule.getObjectDate(1372395600, 0), [2, new Date(1372395600 * 1000), 3, 1, 5]));
    assert.equal(false, engine.$nin(Scule.getObjectDate(1372395600, 0), [2, Scule.getObjectDate(1372395600, 0), 3, 1, 5]));
    assert.equal(false, engine.$nin(new Date(1372395600 * 1000), [2, new Date(1372395600 * 1000), 3, 1, 5]));

};