import { manhattanDistance } from "../algos/algo_util.js";
import { IterableAStar } from "../algos/IterableAStar.js";
import { grid, state } from "../constants.js";
import { canEnterTile, getManhattanNeighbors } from "./app_util.js";

export const initAStar = (): IterableAStar => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.allowDiagonal;

  return new IterableAStar({
    start,
    end,
    canEnterTile,
    getNeighbors: getManhattanNeighbors,
    heuristic: manhattanDistance,
    diagonal,
  });
};
