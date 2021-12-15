import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra.js";
import { initDijkstra } from "../app_util/appDjikstra.js";
import { buttons, grid, state } from "../constants.js";
import { getSpeed } from "./speed.js";
import { handleTick } from "./tick.js";

export const clickGoButton = () => {
  const goButton = buttons.go!;
  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
    buttons.reset!.disabled = false;
    buttons.tick!.disabled = false;
    goButton.innerText = "go";
  } else if (state.currentAlgo) {
    goButton.innerText = "stop";
    startLooping(state.currentAlgo);
  } else {
    goButton.innerText = "stop";
    startDijkstra();
  }
};

export const startLooping = (algo: IterableLazyDijkstra): void => {
  const speed = getSpeed();
  buttons.tick!.disabled = true;
  buttons.reset!.disabled = true;

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
