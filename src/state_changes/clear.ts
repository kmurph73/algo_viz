import { state, buttons } from "../constants.js";
import { clearGrid } from "../grid/clearGrid.js";

export const clickClear = () => {
  clearGrid();
  state.currentAlgo = undefined;
  state.tickType = undefined;

  if (state.currentLoop) {
    clearInterval(state.currentLoop);
    state.currentLoop = undefined;
  }

  buttons.go!.disabled = false;
  buttons.go!.innerText = "go";
};
