/**
 * @author benvanik@google.com (Ben Vanik)
 */

goog.provide('gf.sim.commands.ReparentCommand');

goog.require('gf.sim');
goog.require('gf.sim.Command');
goog.require('gf.sim.commands.CommandType');



// TODO(benvanik): find a way to prevent commands from being sent - for example,
//     this reparent command will get sent on updates (fine) but also on
//     creates (duplication) - would be nice to prevent the send if the entity
//     is also being created in the same sync packet
/**
 * Simulation command to reparent entities.
 * Reparent commands must target entities and will reassign their parents.
 *
 * @constructor
 * @extends {gf.sim.Command}
 * @param {!gf.sim.CommandFactory} commandFactory Command factory.
 */
gf.sim.commands.ReparentCommand = function(commandFactory) {
  goog.base(this, commandFactory);

  /**
   * New parent entity ID.
   * Can be {@see gf.sim#NO_ENTITY_ID} to unassign a parent.
   * @type {number}
   */
  this.parentId = gf.sim.NO_ENTITY_ID;
};
goog.inherits(gf.sim.commands.ReparentCommand, gf.sim.Command);


/**
 * @override
 */
gf.sim.commands.ReparentCommand.prototype.read = function(reader) {
  goog.base(this, 'read', reader);

  this.parentId = reader.readVarUint();
};


/**
 * @override
 */
gf.sim.commands.ReparentCommand.prototype.write = function(writer) {
  goog.base(this, 'write', writer);

  writer.writeVarUint(this.parentId);
};


/**
 * Command ID.
 * @const
 * @type {number}
 */
gf.sim.commands.ReparentCommand.ID = gf.sim.createTypeId(
    gf.sim.GF_MODULE_ID, gf.sim.commands.CommandType.REPARENT);


/**
 * Command flags.
 * @const
 * @type {number}
 */
gf.sim.commands.ReparentCommand.FLAGS = 0;
