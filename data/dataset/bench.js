var sliced = require('./')
var Bench = require('benchmark');
var s = new Bench.Suite;
var slice = [].slice;

s.add('Array.prototype.slice.call', function () {
  Array.prototype.slice.call(arguments);
}).add('[].slice.call', function () {
  [].slice.call(arguments);
}).add('cached slice.call', function () {
  slice.call(arguments)
}).add('sliced', function () {
  sliced(arguments)
}).on('cycle', function (evt) {
  console.log(String(evt.target));
}).on('complete', function () {
  console.log('fastest is %s', this.filter('fastest').pluck('name'));
})
.run();

var s = new Bench.Suite;
s.add('Array.prototype.slice.call(arguments, 1)', function () {
  Array.prototype.slice.call(arguments, 1);
}).add('[].slice.call(arguments, 1)', function () {
  [].slice.call(arguments, 1);
}).add('cached slice.call(arguments, 1)', function () {
  slice.call(arguments, 1)
}).add('sliced(arguments, 1)', function () {
  sliced(arguments, 1)
}).on('cycle', function (evt) {
  console.log(String(evt.target));
}).on('complete', function () {
  console.log('fastest is %s', this.filter('fastest').pluck('name'));
})
.run();

var s = new Bench.Suite;
s.add('Array.prototype.slice.call(arguments, -1)', function () {
  Array.prototype.slice.call(arguments, -1);
}).add('[].slice.call(arguments, -1)', function () {
  [].slice.call(arguments, -1);
}).add('cached slice.call(arguments, -1)', function () {
  slice.call(arguments, -1)
}).add('sliced(arguments, -1)', function () {
  sliced(arguments, -1)
}).on('cycle', function (evt) {
  console.log(String(evt.target));
}).on('complete', function () {
  console.log('fastest is %s', this.filter('fastest').pluck('name'));
})
.run();

var s = new Bench.Suite;
s.add('Array.prototype.slice.call(arguments, -2, -10)', function () {
  Array.prototype.slice.call(arguments, -2, -10);
}).add('[].slice.call(arguments, -2, -10)', function () {
  [].slice.call(arguments, -2, -10);
}).add('cached slice.call(arguments, -2, -10)', function () {
  slice.call(arguments, -2, -10)
}).add('sliced(arguments, -2, -10)', function () {
  sliced(arguments, -2, -10)
}).on('cycle', function (evt) {
  console.log(String(evt.target));
}).on('complete', function () {
  console.log('fastest is %s', this.filter('fastest').pluck('name'));
})
.run();

var s = new Bench.Suite;
s.add('Array.prototype.slice.call(arguments, -2, -1)', function () {
  Array.prototype.slice.call(arguments, -2, -1);
}).add('[].slice.call(arguments, -2, -1)', function () {
  [].slice.call(arguments, -2, -1);
}).add('cached slice.call(arguments, -2, -1)', function () {
  slice.call(arguments, -2, -1)
}).add('sliced(arguments, -2, -1)', function () {
  sliced(arguments, -2, -1)
}).on('cycle', function (evt) {
  console.log(String(evt.target));
}).on('complete', function () {
  console.log('fastest is %s', this.filter('fastest').pluck('name'));
})
.run();


