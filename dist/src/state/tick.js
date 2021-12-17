import { Algo } from "../algos/algo_types.js";
import { walkToDest } from "../app_util/app_util.js";
import { initDijkstra } from "../app_util/initDjikstra.js";
import { state, grid, buttons } from "../constants.js";
export const clickTick = () => {
    if (!state.currentAlgo) {
        state.currentAlgo = initDijkstra();
    }
    const algo = state.currentAlgo;
    const next = algo.next();
    const tile = grid.atPoint(next.point);
    handleTick(tile, next);
};
export const handleTick = (tile, next) => {
    const classList = tile.td.classList;
    if (Algo.ActionType.Found === next.type) {
        if (state.currentLoop) {
            clearInterval(state.currentLoop);
            state.currentLoop = undefined;
        }
        const path = next.path;
        if (!path) {
            throw new Error("end node found, path should be here");
        }
        walkToDest(path);
        buttons.go.disabled = true;
        buttons.reset.disabled = false;
        return;
    }
    if (next.type === Algo.ActionType.Visit) {
        classList.remove("queued");
        classList.add("currentnode");
        if (state.currentVisitedTile) {
            const cl = state.currentVisitedTile.td.classList;
            cl.remove("currentnode");
            cl.add("visited");
        }
        state.currentVisitedTile = tile;
    }
    else {
        classList.add("queued");
    }
};
