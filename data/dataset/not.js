function testNot(x) {
  // The VM constant folds so we use that to check the result.
  var expected = eval("!(" + x + ")");
  var actual = !x;
  assertEquals(expected, actual, "x: " + x);
}

testNot(0);
testNot(1);
testNot(-1);
testNot(-0);

testNot(NaN);
testNot(Infinity);
testNot(-Infinity);

testNot(true);
testNot(false);

assertTrue(!"");
assertFalse(!"foo");

assertFalse(![]);
assertFalse(![1]);
assertFalse(![1,2]);

assertFalse(!{});
assertFalse(!{foo:1});
assertFalse(!{foo:1,bar:2});

assertFalse(!!0);
assertTrue(!!1);
