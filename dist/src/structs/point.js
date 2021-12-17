export const pointsEq = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
};
export const addPoints = (p1, p2) => {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
};
