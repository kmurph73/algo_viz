import { Algo } from "../algos/algo_types.js";
import { walkToDest } from "../app_util/app_util.js";
import { setDisabled } from "../app_util/html_util.js";
import { initAStar } from "../app_util/initAStar.js";
import { initDijkstra } from "../app_util/initDjikstra.js";
import { state, grid, html, searchIsDone } from "../constants.js";
import { Tile } from "../grid/Grid.js";
import { clickClear } from "./clear.js";

export const clickTick = (): void => {
  if (searchIsDone()) {
    clickClear();
    clickTick();

    return;
  }

  if (!state.currentAlgo) {
    state.currentAlgo = state.algo === "A*" ? initAStar() : initDijkstra();
  }

  const algo = state.currentAlgo!;

  const next = algo.next();
  const tile = grid.atPoint(next.point)!;
  handleTick(tile, next);
};

export const handleTick = (tile: Tile, next: Algo.Tick): void => {
  const classList = tile.td.classList;
  state.tickType = next.type;

  const { Found, Visit, NoMas } = Algo.ActionType;

  const donesky = Found === next.type || next.type === NoMas;

  if (donesky) {
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = undefined;
    }

    const path = next.path;
    if (!path && next.type === Found) {
      throw new Error("end node found, path should be here");
    } else if (path) {
      walkToDest(path);
    }

    setDisabled(["go", "tick", "reset", "diagonal", "algo"], false);
    html.go!.innerText = "go";

    return;
  }

  if (next.type === Visit) {
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
