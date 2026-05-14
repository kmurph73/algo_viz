import { enable } from "../app_util/html_util.js";
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

  enable(["algo", "diagonal", "tick", "go", "reset"]);
  html.go!.innerText = "go";
};
