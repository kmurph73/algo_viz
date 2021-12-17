import { euclideanDistance, manhattanDistance } from "../algos/algo_util.js";
import {
  getDiagonalNeighbors,
  getManhattanNeighbors,
} from "../app_util/app_util.js";
import { state } from "../constants.js";

export const changeDiagonal = (e: Event) => {
  const checkbox = e.target as HTMLInputElement;

  state.diagonal = checkbox.checked;

  if (state.currentAlgo) {
    state.currentAlgo.getNeighbors = state.diagonal
      ? getDiagonalNeighbors
      : getManhattanNeighbors;

    if (!state.currentAlgo.isDijkstra()) {
      state.currentAlgo.heuristic = state.diagonal
        ? euclideanDistance
        : manhattanDistance;
    }
  }
};
