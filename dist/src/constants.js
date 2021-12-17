import { Algo } from "./algos/algo_types.js";
import { Grid, TileType } from "./grid/Grid.js";
export const NumRows = 16;
export const NumColumns = 24;
export const initialStartPoint = { x: 1, y: 8 };
export const initialEndPoint = { x: 12, y: 8 };
export const grid = new Grid(initialStartPoint, initialEndPoint);
export const html = {
    go: null,
    tick: null,
    reset: null,
    clear: null,
    speed: null,
    algo: null,
    diagonal: null,
};
export const state = {
    dragging: false,
    currentType: TileType.Wall,
    diagonal: false,
    speed: "medium",
    algo: "A*",
};
export const searchIsDone = () => {
    if (state.tickType == null) {
        return false;
    }
    return (state.tickType === Algo.ActionType.Found ||
        state.tickType === Algo.ActionType.NoMas);
};
