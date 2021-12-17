export const getPath = (lastNode) => {
    const path = [lastNode.point];
    let prev = lastNode.prev;
    while (prev != null) {
        path.push(prev.point);
        prev = prev.prev;
    }
    return path.reverse();
};
export const manhattanDistance = (node1, node2) => {
    const dx = Math.abs(node1.x - node2.x);
    const dy = Math.abs(node1.y - node2.y);
    return dx + dy;
};
export const diagonalDistance = (p1, p2) => {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
};
export const euclideanDistance = (p1, p2) => {
    let y = p2.x - p1.x;
    let x = p2.y - p1.y;
    return Math.sqrt(x * x + y * y);
};
