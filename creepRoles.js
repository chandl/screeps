const upgraderHandler = require('role.upgrader');
const harvesterHandler = require('role.harvester');
const builderHandler = require('role.builder');
const repairerHandler = require('role.repairer');

/**
 * Types of creeps that we should spawn. Includes data
 */
const creepRoles = {
    'harvester': {
        body: [WORK, CARRY, MOVE],
        name: 'Harvester',
        memory: {
            role: 'harvester'
        },
        desiredCount: 0,
        handler: harvesterHandler,
        priority: 1
    },
    'upgrader': {
        body: [WORK, CARRY, MOVE],
        name: 'Upgrader',
        memory: {
            role: 'upgrader'
        },
        desiredCount: 0,
        handler: upgraderHandler,
        priority: 2
    },
    'builder': {
        body: [WORK, CARRY, MOVE],
        name: 'Builder',
        memory: {
            role: 'builder'
        },
        desiredCount: 0,
        handler: builderHandler,
        priority: 3
    },
    'repairer': {
        body: [WORK, CARRY, MOVE],
        name: 'Repairer',
        memory: {
            role: 'repairer'
        },
        desiredCount: 0,
        handler: repairerHandler,
        priority: 4
    }
};

module.exports = {creepRoles};
