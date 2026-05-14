import { state } from "../constants.js";
import { AlgoType } from "../types.js";

export const changeAlgo = (e: Event) => {
  const select = e.target as HTMLSelectElement;
  const algo = select.value as AlgoType;

  state.algo = algo;
};
