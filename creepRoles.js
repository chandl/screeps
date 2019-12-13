const upgraderHandler = require('role.upgrader');
const harvesterHandler = require('role.harvester');
const builderHandler = require('role.builder');
const repairerHandler = require('role.repairer');

/**
 * Types of creeps that we should spawn. Includes data
 */
const creepRoles = {
    'harvester': {
        body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        name: 'Harvester',
        memory: {
            role: 'harvester'
        },
        desiredCount: 6,
        handler: harvesterHandler,
        priority: 1
    },
    'upgrader': {
        body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        name: 'Upgrader',
        memory: {
            role: 'upgrader'
        },
        desiredCount: 5,
        handler: upgraderHandler,
        priority: 2
    },
    'builder': {
        body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        name: 'Builder',
        memory: {
            role: 'builder'
        },
        desiredCount: 4,
        handler: builderHandler,
        priority: 3
    },
    'repairer': {
        body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        name: 'Repairer',
        memory: {
            role: 'repairer'
        },
        desiredCount: 2,
        handler: repairerHandler,
        priority: 4
    }
};

module.exports = {creepRoles};
