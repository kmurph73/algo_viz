import { state, html } from "../constants.js";
import { clearGrid } from "../grid/clearGrid.js";

export const clickClear = () => {
  clearGrid();
  state.currentAlgo = undefined;
  state.tickType = undefined;

  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
  }

  html.go!.disabled = false;
  html.go!.innerText = "go";
};
