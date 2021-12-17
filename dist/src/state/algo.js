import { state } from "../constants.js";
export const changeAlgo = (e) => {
    const select = e.target;
    const algo = select.value;
    state.algo = algo;
};
export const getSpeed = () => {
    switch (state.speed) {
        case "slow":
            return 60;
        case "medium":
            return 30;
        case "fast":
            return 1;
    }
};
