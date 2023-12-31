/**
 * @fileoverview Overdrive pedal.
 */

goog.provide('pb.stomp.Overdrive');
goog.require('pb.pot.Log');
goog.require('pb.stomp.Box');
goog.require('pb.stomp.OverdriveModel');



/**
 * Overdrive pedal.
 *
 * @constructor
 * @extends {pb.stomp.Box}
 * @param {AudioContext} context Audio context the pedal will work on.
 */
pb.stomp.Overdrive = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.stomp.Overdrive, pb.stomp.Box);


/**
 * @override
 */
pb.stomp.Overdrive.prototype.modelClass = pb.stomp.OverdriveModel;


/**
 * @override
 */
pb.stomp.Overdrive.prototype.createPots = function() {
    goog.base(this, 'createPots');
    var driveHandler = goog.bind(this.model.setDrive, this.model);
    var toneHandler = goog.bind(this.model.setTone, this.model);

    this.drivePot = new pb.pot.Log(driveHandler, 'drive', 2000);
    this.tonePot = new pb.pot.Log(toneHandler, 'tone', 3000, pb.pot.Pot.Size.SMALL);
    this.pots.push(this.drivePot, this.tonePot);
};


/**
 * Sets the drive pot.
 *
 * @param {number} newValue New drive value, ranges between 0-10.
 */
pb.stomp.Overdrive.prototype.setDrive = function(newValue) {
    this.drivePot.setValue(newValue);
};


/**
 * Sets the tone pot.
 *
 * @param {number} newValue New tone value.
 */
pb.stomp.Overdrive.prototype.setTone = function(newValue) {
    this.tonePot.setValue(newValue);
};


/**
 * @override
 */
pb.stomp.Overdrive.prototype.name = 'overdrive';
