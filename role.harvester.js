const util = require('util');

const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.memory.depositing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.depositing = false;
            this.harvest(creep);
        }
        if(!creep.memory.depositing && creep.store.getFreeCapacity() === 0) {
            creep.memory.depositing = true;
            creep.say('depositing energy...');
            this.stopHarvesting(creep);
        }
        
        if (creep.memory.depositing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            this.harvest(creep);
        }
    },

    harvest: function (creep) {
        if (creep.memory.harvestSourceId === undefined) {
            creep.say('🔄 harvest');
            creep.memory.harvestSourceId = util.findBestSource(creep.room).id;
        }
        const harvestSource = Game.getObjectById(creep.memory.harvestSourceId);
        if (creep.harvest(harvestSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(harvestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    stopHarvesting: function (creep) {
        creep.memory.harvestSourceId = undefined;
    }
};


module.exports = roleHarvester;