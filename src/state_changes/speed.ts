import { state } from "../constants.js";
import { Speed } from "../types";
import { startLooping } from "./go.js";

export const changeSpeed = (e: Event) => {
  const select = e.target as HTMLSelectElement;
  const speed = select.value as Speed;

  state.speed = speed;

  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
    startLooping(state.currentAlgo!);
  }
};

export const getSpeed = (): number => {
  switch (state.speed) {
    case "slow":
      return 60;
    case "medium":
      return 30;
    case "fast":
      return 10;
  }
};
