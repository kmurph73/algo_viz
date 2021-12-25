import { IterableDijkstra } from "../algos/IterableDijkstra.js";
import { grid, state } from "../constants.js";
import {
  canEnterTile,
  getDiagonalNeighbors,
  getManhattanNeighbors,
} from "./app_util.js";

export const initDijkstra = (): IterableDijkstra => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.diagonal;

  return new IterableDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: diagonal ? getDiagonalNeighbors : getManhattanNeighbors,
  });
};
