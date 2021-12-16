import { state, buttons } from "../constants.js";
import { resetGrid } from "../grid/resetGrid.js";

export const clickReset = () => {
  resetGrid();
  state.currentAlgo = undefined;

  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
  }

  buttons.go!.innerText = "go";
};
