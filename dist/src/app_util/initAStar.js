import { euclideanDistance, manhattanDistance } from "../algos/algo_util.js";
import { IterableAStar } from "../algos/IterableAStar.js";
import { grid, state } from "../constants.js";
import { canEnterTile, getDiagonalNeighbors, getManhattanNeighbors, } from "./app_util.js";
export const initAStar = () => {
    const start = grid.startPoint;
    const end = grid.endPoint;
    const diagonal = state.diagonal;
    return new IterableAStar({
        start,
        end,
        canEnterTile,
        getNeighbors: diagonal ? getDiagonalNeighbors : getManhattanNeighbors,
        heuristic: diagonal ? euclideanDistance : manhattanDistance,
    });
};
