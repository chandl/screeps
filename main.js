const creepHandler = require('creepHandler');

module.exports.loop = function () {
    creepHandler.spawnCreeps();
    creepHandler.workCreeps();
    creepHandler.clearMemory();
};
