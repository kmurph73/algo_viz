import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import { canEnterTile, getManhattanNeighbors } from "./app_util.js";

export const initDijkstra = (): IterableLazyDijkstra => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.allowDiagonal;

  return new IterableLazyDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: getManhattanNeighbors,
    diagonal,
  });
};
