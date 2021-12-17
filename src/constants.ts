import { Algo } from "./algos/algo_types.js";
import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 20;
export const NumColumns = 20;

export const initialStartPoint = { x: 1, y: 10 };
export const initialEndPoint = { x: 12, y: 10 };

export const grid = new Grid(initialStartPoint, initialEndPoint);

type Buttons = {
  go: HTMLButtonElement | null;
  tick: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
  clear: HTMLButtonElement | null;
};

type Selects = {
  speed: HTMLSelectElement | null;
  algo: HTMLSelectElement | null;
};

type Checkboxes = {
  diagonal: HTMLSelectElement | null;
};

export const buttons: Buttons = {
  go: null,
  tick: null,
  reset: null,
  clear: null,
};

export const selects: Selects = {
  speed: null,
  algo: null,
};

export const checkboxes: Checkboxes = {
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
