const build = require('role.builder');
const harvest = require('role.harvester');

const roleRepairer = {
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            harvest.harvest(creep, useStorage=true);
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
            harvest.stopHarvesting(creep);
        }

        if (creep.memory.repairing) {
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            });

            if (target) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            harvest.harvest(creep);
        }
    }
};

module.exports = roleRepairer;
