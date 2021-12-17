import { buttons, checkboxes, selects } from "../constants.js";
import { changeAlgo } from "../state_changes/algo.js";
import { clickClear } from "../state_changes/clear.js";
import { changeDiagonal } from "../state_changes/diagonal.js";
import { clickGoButton } from "../state_changes/go.js";
import { clickReset } from "../state_changes/reset.js";
import { changeSpeed } from "../state_changes/speed.js";
import { clickTick } from "../state_changes/tick.js";
import { unwrap } from "../util/util.js";

export const assignHTMLElements = (): void => {
  buttons.go = unwrap(document.getElementById("go")) as HTMLButtonElement;
  buttons.tick = unwrap(document.getElementById("tick")) as HTMLButtonElement;
  buttons.reset = unwrap(document.getElementById("reset")) as HTMLButtonElement;
  buttons.clear = unwrap(document.getElementById("clear")) as HTMLButtonElement;

  selects.speed = unwrap(
    document.getElementById("speed_select")
  ) as HTMLSelectElement;
  selects.algo = unwrap(
    document.getElementById("algo_select")
  ) as HTMLSelectElement;

  checkboxes.diagonal = unwrap(
    document.getElementById("diagonal")
  ) as HTMLSelectElement;
};

export const attachEvents = (): void => {
  buttons.go!.addEventListener("click", clickGoButton);
  buttons.tick!.addEventListener("click", clickTick);
  buttons.reset!.addEventListener("click", clickReset);
  buttons.clear!.addEventListener("click", clickClear);

  selects.speed!.addEventListener("change", changeSpeed);
  selects.algo!.addEventListener("change", changeAlgo);

  checkboxes.diagonal!.addEventListener("change", changeDiagonal);
};
