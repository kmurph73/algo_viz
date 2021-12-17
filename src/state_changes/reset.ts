import { state, html } from "../constants.js";
import { resetGrid } from "../grid/resetGrid.js";

export const clickReset = () => {
  resetGrid();
  state.currentAlgo = undefined;
  state.tickType = undefined;

  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
  }

  html.go!.innerText = "go";
  html.go!.disabled = false;
};
