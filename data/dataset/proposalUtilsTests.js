// tests for proposal utils, text manipulation and matching
/*global define */
define(["plugins/esprima/proposalUtils", "orion/assert"], function(utils, assert) {

	var tests = [];
	
	
	tests['test isUpperCase'] = function() {
		assert.ok(utils.isUpperCase('A'));
		assert.ok(utils.isUpperCase('Z'));
		assert.ok(!utils.isUpperCase('a'));
		assert.ok(!utils.isUpperCase('z'));
		assert.ok(!utils.isUpperCase('0'));
	};
	tests['test startsWith'] = function() {
		assert.ok(utils.startsWith('Aaa', ''));
		assert.ok(utils.startsWith('Aaa', 'A'));
		assert.ok(utils.startsWith('Aaa', 'Aaa'));
		assert.ok(!utils.startsWith('Aaa', 'Aaaa'));
	};
	tests['test toCamelCaseParts'] = function() {
		assert.deepEqual(utils.toCamelCaseParts('aaa'), ['aaa']);
		assert.deepEqual(utils.toCamelCaseParts('aaaAaa'), ['aaa', 'Aaa']);
		assert.deepEqual(utils.toCamelCaseParts('aaaAAaa'), ['aaa', 'A', 'Aaa']);
		assert.deepEqual(utils.toCamelCaseParts('AAAA'), ['A', 'A', 'A', 'A']);
		assert.deepEqual(utils.toCamelCaseParts('A0A1A2Aa'), ['A0', 'A1', 'A2', 'Aa']);
		assert.deepEqual(utils.toCamelCaseParts(''), []);
	};
	tests['test looselyMatches'] = function() {
		assert.ok(utils.looselyMatches('aaa', 'aaa'));
		assert.ok(utils.looselyMatches('a', 'aaa'));
		assert.ok(utils.looselyMatches('aAa', 'aAa'));
		assert.ok(utils.looselyMatches('aAa', 'a123Aa123'));
		assert.ok(utils.looselyMatches('SoLoWo', 'SomeLongWord'));
		// lower-case matching works too
		assert.ok(utils.looselyMatches('somelon', 'SomeLongWord'));

		assert.ok(!utils.looselyMatches('SoLoWo', 'SomeOtherLongWord'));
		assert.ok(!utils.looselyMatches('somElon', 'SomeLongWord'));
	};
	
	return tests;
});