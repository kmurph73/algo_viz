import { buttons, selects } from "../constants.js";
import { clickGoButton } from "../state/go.js";
import { clickReset } from "../state/reset.js";
import { changeSpeed } from "../state/speed.js";
import { clickTick } from "../state/tick.js";
import { unwrap } from "../util/util.js";
export const assignHTMLElements = () => {
    buttons.go = unwrap(document.getElementById("go"));
    buttons.tick = unwrap(document.getElementById("tick"));
    buttons.reset = unwrap(document.getElementById("reset"));
    selects.speed = unwrap(document.getElementById("speed_select"));
};
export const attachEvents = () => {
    buttons.go.addEventListener("click", clickGoButton);
    buttons.tick.addEventListener("click", clickTick);
    buttons.reset.addEventListener("click", clickReset);
    selects.speed.addEventListener("change", changeSpeed);
};
