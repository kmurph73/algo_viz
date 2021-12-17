import { state } from "../constants.js";
import { startLooping } from "./go.js";
export const changeSpeed = (e) => {
    const select = e.target;
    const speed = select.value;
    state.speed = speed;
    if (state.currentLoop) {
        clearInterval(state.currentLoop);
        state.currentLoop = undefined;
        startLooping(state.currentAlgo);
    }
};
export const getSpeed = () => {
    switch (state.speed) {
        case "slow":
            return 60;
        case "medium":
            return 30;
        case "fast":
            return 10;
    }
};
