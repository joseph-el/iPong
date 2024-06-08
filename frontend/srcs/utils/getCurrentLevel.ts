const XP_RANGES: [number, number, number][] = [
    [0, 99, 1],
    [100, 249, 2],
    [250, 499, 3],
    [500, 999, 4],
    [1000, 1999, 5],
    [2000, Infinity, 6]
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
    if (currentLevel >= XP_RANGES.length) {
        return 0;
    }
    const nextLevelMinXp = XP_RANGES[currentLevel][0];
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