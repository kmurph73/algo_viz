import {
  ActionType,
  AlgoNode,
  AlgoTick,
} from "../algos/IterableLazyDijkstra.js";
import { initDijkstra, walkToDest } from "../app_util/appDjikstra.js";
import { state, grid, buttons } from "../constants.js";
import { Tile } from "../grid/Grid.js";

export const clickTick = (): void => {
  if (!state.currentAlgo) {
    state.currentAlgo = initDijkstra();
  }

  const algo = state.currentAlgo!;

  const next = algo.next();
  const tile = grid.atPoint(next.point)!;
  handleTick(tile, next);
};

export const handleTick = (tile: Tile, next: AlgoTick): void => {
  const classList = tile.td.classList;

  if (ActionType.Found === next.type) {
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = undefined;
    }

    const path = next.path;
    if (!path) {
      throw new Error("end node found, path should be here");
    }

    walkToDest(path);

    buttons.go!.disabled = true;
    buttons.reset!.disabled = false;

    return;
  }

  if (next.type === ActionType.Visit) {
    classList.remove("queued");
    classList.add("currentnode");

    if (state.currentVisitedTile) {
      const cl = state.currentVisitedTile.td.classList;
      cl.remove("currentnode");
      cl.add("visited");
    }

    state.currentVisitedTile = tile;
  } else {
    classList.add("queued");
  }
};
