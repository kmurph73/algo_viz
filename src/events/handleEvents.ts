import { html } from "../constants.js";
import { changeAlgo } from "../state_changes/algo.js";
import { clickClear } from "../state_changes/clear.js";
import { changeDiagonal } from "../state_changes/diagonal.js";
import { clickGoButton } from "../state_changes/go.js";
import { clickReset } from "../state_changes/reset.js";
import { changeSpeed } from "../state_changes/speed.js";
import { clickTick } from "../state_changes/tick.js";
import { unwrap } from "../util/util.js";

export const assignHTMLElements = (): void => {
  html.go = unwrap(document.getElementById("go")) as HTMLButtonElement;
  html.tick = unwrap(document.getElementById("tick")) as HTMLButtonElement;
  html.reset = unwrap(document.getElementById("reset")) as HTMLButtonElement;

  html.speed = unwrap(
    document.getElementById("speed_select")
  ) as HTMLSelectElement;
  html.algo = unwrap(
    document.getElementById("algo_select")
  ) as HTMLSelectElement;

  html.diagonal = unwrap(
    document.getElementById("diagonal")
  ) as HTMLSelectElement;
};

export const attachEvents = (): void => {
  html.go!.addEventListener("click", clickGoButton);
  html.tick!.addEventListener("click", clickTick);
  html.reset!.addEventListener("click", clickReset);

  html.speed!.addEventListener("change", changeSpeed);
  html.algo!.addEventListener("change", changeAlgo);

  html.diagonal!.addEventListener("change", changeDiagonal);
};
