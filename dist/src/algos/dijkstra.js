import { TileType } from "../grid/Grid.js";
import { UniqueQueue } from "./UniqueQueue.js";
const neighbors = [
    ["north", { row: 1, col: 0 }],
    ["east", { row: 0, col: 1 }],
    ["south", { row: -1, col: 0 }],
    ["west", { row: 0, col: -1 }],
    ["northEast", { row: 1, col: 1 }],
    ["southEast", { row: -1, col: 1 }],
    ["southWest", { row: -1, col: -1 }],
    ["northWest", { row: 1, col: -1 }],
];
// const neighborList = Object.entries(neighbors);
export const dijkstra = (start, destination, grid) => {
    let currentNode = {
        point: start,
        value: 0,
        prev: null,
    };
    const visited = {};
    const awaitingVisit = new UniqueQueue();
    let count = 0;
    while (true) {
        // find neighbors
        for (let index = 0; index < neighbors.length; index++) {
            const neighborPoint = neighbors[index][1];
            const { row, col } = addPoints(currentNode.point, neighborPoint);
            const tile = grid.at(row, col);
            if (!tile) {
                continue;
            }
            const visitedNode = visited[`${row},${col}`];
            if (visitedNode) {
                continue;
            }
            if (tile.type === TileType.Empty) {
                const neighbor = {
                    point: { row, col },
                    value: currentNode.value + 1,
                    prev: currentNode,
                };
                grid.tdAt(row, col).classList.add("blue");
                awaitingVisit.enqueue(`${row},${col}`, neighbor);
            }
        }
        const { row, col } = currentNode.point;
        visited[`${row},${col}`] = currentNode;
        const node = awaitingVisit.dequeue();
        if (node == null) {
            throw new Error("visited em all, no dice");
        }
        count += 1;
        currentNode = node;
        const isDest = pointsEq(currentNode.point, destination);
        if (isDest) {
            break;
        }
    }
    const path = [currentNode.point];
    let prev = currentNode.prev;
    while (prev != null) {
        path.push(prev.point);
        prev = prev.prev;
    }
    return path.reverse();
};
const pointsEq = (p1, p2) => {
    return p1.row === p2.row && p1.col === p2.col;
};
const addPoints = (p1, p2) => {
    return { row: p1.row + p2.row, col: p1.col + p2.col };
};
// const closestStepToTarget = (point: Point, target: Point): Point => {};
