import { state } from "../constants.js";
import { AlgoType } from "../types";

export const changeAlgo = (e: Event) => {
  const select = e.target as HTMLSelectElement;
  const algo = select.value as AlgoType;

  state.algo = algo;
};

export const getSpeed = (): number => {
  switch (state.speed) {
    case "slow":
      return 60;
    case "medium":
      return 30;
    case "fast":
      return 1;
  }
};
