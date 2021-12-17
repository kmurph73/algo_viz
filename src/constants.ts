import { Algo } from "./algos/algo_types.js";
import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 16;
export const NumColumns = 24;

export const initialStartPoint = { x: 1, y: 8 };
export const initialEndPoint = { x: 12, y: 8 };

export const grid = new Grid(initialStartPoint, initialEndPoint);

export type UserInput = {
  go: HTMLButtonElement | null;
  tick: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
  clear: HTMLButtonElement | null;

  speed: HTMLSelectElement | null;
  algo: HTMLSelectElement | null;

  diagonal: HTMLSelectElement | null;
};

export const html: UserInput = {
  go: null,
  tick: null,
  reset: null,
  clear: null,
  speed: null,
  algo: null,
  diagonal: null,
};

export const state: State = {
  dragging: false,
  currentType: TileType.Wall,
  diagonal: false,
  speed: "medium",
  algo: "A*",
};

export const searchIsDone = (): boolean => {
  if (state.tickType == null) {
    return false;
  }

  return (
    state.tickType === Algo.ActionType.Found ||
    state.tickType === Algo.ActionType.NoMas
  );
};
