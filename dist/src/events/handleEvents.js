import { html } from "../constants.js";
import { changeAlgo } from "../state_changes/algo.js";
import { clickClear } from "../state_changes/clear.js";
import { changeDiagonal } from "../state_changes/diagonal.js";
import { clickGoButton } from "../state_changes/go.js";
import { clickReset } from "../state_changes/reset.js";
import { changeSpeed } from "../state_changes/speed.js";
import { clickTick } from "../state_changes/tick.js";
import { unwrap } from "../util/util.js";
export const assignHTMLElements = () => {
    html.go = unwrap(document.getElementById("go"));
    html.tick = unwrap(document.getElementById("tick"));
    html.reset = unwrap(document.getElementById("reset"));
    html.clear = unwrap(document.getElementById("clear"));
    html.speed = unwrap(document.getElementById("speed_select"));
    html.algo = unwrap(document.getElementById("algo_select"));
    html.diagonal = unwrap(document.getElementById("diagonal"));
};
export const attachEvents = () => {
    html.go.addEventListener("click", clickGoButton);
    html.tick.addEventListener("click", clickTick);
    html.reset.addEventListener("click", clickReset);
    html.clear.addEventListener("click", clickClear);
    html.speed.addEventListener("change", changeSpeed);
    html.algo.addEventListener("change", changeAlgo);
    html.diagonal.addEventListener("change", changeDiagonal);
};
