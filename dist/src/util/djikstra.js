"use strict";
const cardinal = [
    ["north", { row: 1, col: 0 }],
    ["east", { row: 0, col: 1 }],
    ["south", { row: -1, col: 0 }],
    ["west", { row: 0, col: -1 }],
];
const allNeighbors = [
    ["north", { row: 1, col: 0 }],
    ["east", { row: 0, col: 1 }],
    ["south", { row: -1, col: 0 }],
    ["west", { row: 0, col: -1 }],
    ["northEast", { row: 1, col: 1 }],
    ["southEast", { row: -1, col: 1 }],
    ["southWest", { row: -1, col: -1 }],
    ["northWest", { row: 1, col: -1 }],
];
