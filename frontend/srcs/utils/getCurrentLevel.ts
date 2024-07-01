const XP_RANGES: [number, number, number][] = [
    [0, 99, 0],
    [100, 199, 1],
    [200, 399, 2],
    [400, 799, 3],
    [800, 1599, 4],
    [1600, 3199, 5],
    [3200, Infinity, 6],
];


export function getUserLevel(xp: number): number {
    if (!xp || xp === undefined)
        return 0;
    for (const [minXp, maxXp, level] of XP_RANGES) {
        if (xp >= minXp && xp <= maxXp) {
            return level;
        }
    }
    return 0;
}


export function getXpToNextLevel(xp: number): number {
    const currentLevel = getUserLevel(xp);
    console.log("currentLevel", currentLevel);
    if (currentLevel >= XP_RANGES.length) {
        return 0;
    }
    const nextLevelMinXp = XP_RANGES[currentLevel][1];

    return nextLevelMinXp - xp;
}



export function getXpRangeForCurrentLevel(level: number): [number, number] {
    for (const [minXp, maxXp, lvl] of XP_RANGES) {
        if (lvl === level) {
            return [minXp, maxXp];
        }
    }
    return [0, 0];
}