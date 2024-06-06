export function getUserLevel(xp: number): number {

    const XP_RANGES: [number, number, number][] = [
        [0, 99, 1],
        [100, 249, 2],
        [250, 499, 3],
        [500, 999, 4],
        [1000, 1999, 5],
        [2000, Infinity, 6]
    ];

    for (const [minXp, maxXp, level] of XP_RANGES) {
        if (xp >= minXp && xp <= maxXp) {
            return level;
        }
    }
    return 0;
}