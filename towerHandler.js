const handleAllTowers = () => {
    const towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

    for(let i=0; i<towers.length; i++) {
        const tower = towers[i];
        const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy) {
            _attack(tower, enemy);
        } else {
            if (tower.energy >= 600) {
                _repair(tower);
            }
        }
    }
};

const _repair = (tower) => {
    let targets = [];
    for(let priority=1; priority<3 && targets.length == 0; priority++) {
        targets = _getRepairTargets(tower, priority);
    }
    if(targets.length > 0) {
        tower.repair(tower.pos.findClosestByRange(targets));
    }
};

const _attack = (tower, enemy) => {
    console.log("Tower ", tower, " attacking enemy: ", enemy);
    tower.attack(enemy);
};

const _getRepairTargets = (tower, priority) => {
    switch (priority)
    {
        case 1: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hitsMax - s.hits >= 1500);
        case 2: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_RAMPART && s.hits < 300000);
        case 3: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_WALL && s.hits < 300000);
        default: return null;
    }
}

module.exports = {handleAllTowers};