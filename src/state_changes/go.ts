import { Algo } from "../algos/algo_types.js";
import { IterableAStar } from "../algos/IterableAStar.js";
import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra.js";
import { initAStar } from "../app_util/initAStar.js";
import { initDijkstra } from "../app_util/initDjikstra.js";
import { buttons, checkboxes, grid, selects, state } from "../constants.js";
import { clickClear } from "./clear.js";
import { getSpeed } from "./speed.js";
import { handleTick } from "./tick.js";

export const clickGoButton = () => {
  const goButton = buttons.go!;
  const done =
    state.tickType === Algo.ActionType.NoMas ||
    state.tickType === Algo.ActionType.Found;

  if (done) {
    // search is done, restart it
    clickClear();
    clickGoButton();
  } else if (state.currentLoop) {
    // stop clicked
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
    buttons.reset!.disabled = false;
    buttons.tick!.disabled = false;
    checkboxes.diagonal!.disabled = false;
    selects.algo!.disabled = false;

    goButton.innerText = "go";
  } else if (state.currentAlgo) {
    // restart algo
    goButton.innerText = "stop";
    startLooping(state.currentAlgo);
  } else {
    // fresh start
    goButton.innerText = "stop";
    state.algo === "A*" ? startAStar() : startDijkstra();
  }
};

export const startLooping = (
  algo: IterableLazyDijkstra | IterableAStar
): void => {
  const speed = getSpeed();
  buttons.tick!.disabled = true;
  buttons.reset!.disabled = true;
  selects.algo!.disabled = true;
  checkboxes.diagonal!.disabled = true;

  const loop = setInterval(() => {
    const next = algo.next();
    const tile = grid.atPoint(next.point)!;

    handleTick(tile, next);
  }, speed);

  state.currentLoop = loop;
};

export const startDijkstra = () => {
  const algo = initDijkstra();
  state.currentAlgo = algo;

  startLooping(algo);
};

export const startAStar = () => {
  const algo = initAStar();
  state.currentAlgo = algo;

  startLooping(algo);
};
