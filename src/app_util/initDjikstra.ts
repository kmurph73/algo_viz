import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import {
  canEnterTile,
  getDiagonalNeighbors,
  getManhattanNeighbors,
} from "./app_util.js";

export const initDijkstra = (): IterableLazyDijkstra => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.diagonal;

  return new IterableLazyDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: diagonal ? getDiagonalNeighbors : getManhattanNeighbors,
  });
};
