const roles = require('creepRoles').creepRoles;
const PriorityQueue = require('priorityQueue');

const _count = role => {
    return _.filter(Game.creeps, (creep) => creep.memory.role === role).length;
};

const clearMemory = () => {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Sweeping up dead creep:', name);
        }
    }
};
const spawnCreeps = () => {
    const queue = new PriorityQueue();
    for (let role in roles) {
        const currentCount = _count(role);
        // console.log("role " + role + ". count: " + currentCount + ". desired: " + roles[role].desiredCount);
        if (currentCount < roles[role].desiredCount) {
            queue.push(roles[role]);
        } else if (roles[role].desiredCount === 0) {
            roles[role].priority = 100 + currentCount;
            queue.push(roles[role]);
        }
    }

    if(!queue.isEmpty()) {
        const role = queue.pop();
        const name = Game.spawns['Spawn1']
            .spawnCreep(role.body,
                role.name + '_' + Game.time,
                {memory: role.memory});

        if (!name > 0) {
            console.log('Spawning new \'' + role.name + '\', priority: ' + role.priority);
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + role.name,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        } 
    }
};

const workCreeps = () => {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        roles[creep.memory.role].handler.run(creep);
    }
};

module.exports = {spawnCreeps, clearMemory, workCreeps};