'use strict';


// stdlib
var inherits = require('util').inherits;


// 3rd-party
var _ = require('lodash');


// internal
var Template = require('./template');
var prop     = require('./common').prop;


// Class constructor
var Processor = module.exports = function Processor() {
  Template.apply(this, arguments);
};


inherits(Processor, Template);



// Run processor
Processor.prototype.evaluate = function (context) {
  if (Processor === this.constructor) {
    throw new Error('Processor can\'t be used directly. Use `Processor.create()`.');
  }

  return this.constructor.__func__(context, this.data);
};


/**
 *  Processor.create(name, func) -> Function
 *
 *  Returns new `Processor` subclass.
 **/
Processor.create = function (name, func) {
  var Klass;

  if (!_.isFunction(func)) {
    throw new Error('Processor#create() expects second argument to be a function.');
  }

  Klass = function () { Processor.apply(this, arguments); };
  inherits(Klass, Processor);

  prop(Klass, '__name__', 'Processor(' + name + ')');
  prop(Klass, '__func__', func);

  return Klass;
};
