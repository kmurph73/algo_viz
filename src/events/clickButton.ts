import { buttons, selects } from "../constants.js";
import { clickGoButton } from "../state/go.js";
import { clickReset } from "../state/reset.js";
import { changeSpeed } from "../state/speed.js";
import { clickTick } from "../state/tick.js";
import { unwrap } from "../util/util.js";

export const assignHTMLElements = (): void => {
  buttons.go = unwrap(document.getElementById("go")) as HTMLButtonElement;
  buttons.tick = unwrap(document.getElementById("tick")) as HTMLButtonElement;
  buttons.reset = unwrap(document.getElementById("reset")) as HTMLButtonElement;
  selects.speed = unwrap(
    document.getElementById("speed_select")
  ) as HTMLSelectElement;
};

export const attachEvents = (): void => {
  buttons.go!.addEventListener("click", clickGoButton);
  buttons.tick!.addEventListener("click", clickTick);
  buttons.reset!.addEventListener("click", clickReset);

  selects.speed!.addEventListener("change", changeSpeed);
};
