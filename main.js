const creepHandler = require('creepHandler');
const towerHandler = require('towerHandler');

module.exports.loop = function () {
    creepHandler.spawnCreeps();
    creepHandler.workCreeps();
    creepHandler.clearMemory();
    towerHandler.handleAllTowers();
};
