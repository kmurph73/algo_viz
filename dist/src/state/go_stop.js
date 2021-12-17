import { ActionType, } from "../algos/IterableLazyDijkstra";
import { getSpeed, handleTick, walkToDest } from "../app_util/appDjikstra";
import { buttons, grid, state } from "../constants";
export const clickGoButton = () => {
    const goButton = buttons.go;
    if (state.currentLoop) {
        clearInterval(state.currentLoop);
        state.currentLoop = undefined;
        goButton.innerText = "go";
    }
    else if (state.currentAlgo) {
        goButton.innerText = "stop";
        startLooping(state.currentAlgo);
    }
    else {
        goButton.innerText = "stop";
        startAlgo();
    }
};
export const startLooping = (algo) => {
    const speed = getSpeed();
    buttons.tick.disabled = true;
    buttons.reset.disabled = true;
    const loop = setInterval(() => {
        const next = algo.next();
        const tile = grid.atPoint(next.point);
        handleTick(tile, next.type);
        if (ActionType.Found === next.type) {
            clearInterval(loop);
            const path = next.path;
            if (!path) {
                throw new Error("end node found, path should be here");
            }
            walkToDest(path);
        }
    }, speed);
    state.currentLoop = loop;
};
export const startDijkstra = () => {
    const algo = initDijkstra();
    state.currentAlgo = algo;
    startLooping(algo);
};
function initDijkstra() {
    throw new Error("Function not implemented.");
}
function startAlgo() {
    throw new Error("Function not implemented.");
}
