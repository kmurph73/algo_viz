import { grid } from "../constants.js";
import { TileType } from "../grid/Grid.js";
import { addPoints } from "../structs/point.js";
const manhattanNeighbors = [
    ["north", { x: 0, y: 1 }],
    ["east", { x: 1, y: 0 }],
    ["south", { x: 0, y: -1 }],
    ["west", { x: -1, y: 0 }],
];
const allNeighbors = [
    ["north", { x: 0, y: 1 }],
    ["east", { x: 1, y: 0 }],
    ["south", { x: 0, y: -1 }],
    ["west", { x: -1, y: 0 }],
    ["northEast", { x: 1, y: 1 }],
    ["southEast", { x: 1, y: -1 }],
    ["southWest", { x: -1, y: -1 }],
    ["northWest", { x: -1, y: 1 }],
];
export const getNeighbors = (x, y, diagonal) => {
    const points = [];
    const directions = diagonal ? allNeighbors : manhattanNeighbors;
    for (let index = 0; index < directions.length; index++) {
        const point = directions[index][1];
        const nextPoint = addPoints(point, { x, y });
        points.push(nextPoint);
    }
    return points;
};
export const getDiagonalNeighbors = (x, y) => {
    return getNeighbors(x, y, true);
};
export const getManhattanNeighbors = (x, y) => {
    return getNeighbors(x, y, false);
};
export const canEnterTile = (x, y) => {
    const tile = grid.at(x, y);
    return tile != null && tile.type === TileType.Empty;
};
export const walkToDest = (path) => {
    let steps = 0;
    const len = path.length - 1;
    const walk = setInterval(() => {
        if (steps <= len) {
            const point = path[steps];
            const tile = grid.atPoint(point);
            tile.td.classList.add("yellow-brick");
            steps += 1;
        }
        else {
            window.clearInterval(walk);
        }
    }, 30);
};
