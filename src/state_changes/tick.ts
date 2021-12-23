import { Algo } from "../algos/algo_types.js";
import { walkToDest } from "../app_util/app_util.js";
import { enable } from "../app_util/html_util.js";
import { initAStar } from "../app_util/initAStar.js";
import { initDijkstra } from "../app_util/initDjikstra.js";
import { state, grid, html, searchIsDone } from "../constants.js";
import { Tile } from "../grid/Grid.js";
import { roundToOneDecimal } from "../util/util.js";
import { handleClear } from "./clear.js";

export const clickTick = (): void => {
  if (searchIsDone()) {
    handleClear({ keepWalls: true });
    clickTick();

    return;
  }

  if (!state.currentAlgo) {
    state.currentAlgo = state.algo === "A*" ? initAStar() : initDijkstra();
  }

  const algo = state.currentAlgo!;

  const next = algo.next();
  const tile = grid.atPoint(next.point)!;
  if (next.cost) {
    tile.cost = next.cost;
  }
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

    enable(["go", "tick", "reset", "diagonal", "algo"]);
    html.go!.innerText = "go";

    return;
  }

  if (next.type === Visit) {
    classList.remove("queued");
    classList.add("currentnode");

    if (state.currentVisitedTile) {
      const classList = state.currentVisitedTile.td.classList;
      classList.remove("currentnode");
      classList.add("visited");
    }

    state.currentVisitedTile = tile;
  } else {
    if (state.showCost && next.cost) {
      const cost = state.diagonal ? roundToOneDecimal(next.cost) : next.cost;
      tile.td.innerText = cost.toString();
    }

    classList.add("queued");
  }
};
