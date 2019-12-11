const findBestSource = (room) => {
    let sources = room.find(FIND_SOURCES);
    let switchSource = _.random(0, 4) === 0;
    let used;
    if (_sourcePriority(sources[1]) > _sourcePriority(sources[0])) {
        if (switchSource) {
            used = sources[0];
        } else {
            used = sources[1];
        }
    } else {
        if (switchSource) {
            used = sources[1];
        } else {
            used = sources[0];
        }
    }

    return used;
};

/**
 *  determines how many energy you get for each tick until regeneration,
 *  and prioritizes sources running out soon more.
 */
const _sourcePriority = (source) => {

    let priority;
    if (source.ticksToRegeneration === undefined) {
        priority = 10;
    } else if (source.energy === 0) {
        priority = 0;
    } else {
        priority = source.energy / source.ticksToRegeneration;
    }
    if (priority > 0 && source.ticksToRegeneration < 150) {
        priority = priority * (1 + (150 - source.ticksToRegeneration) / 250);
        if (source.ticksToRegeneration < 70) {
            priority = priority + (70 - source.ticksToRegeneration) / 10;
        }
    }
    return priority;
};

module.exports = {findBestSource};