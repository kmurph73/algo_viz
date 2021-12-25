import { Algo } from "./algos/algo_types.js";
import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 16;
export const NumColumns = 24;

export const defaultStartPoint = { x: 1, y: 8 };
export const defaultEndpoint = { x: 12, y: 8 };

export const grid = new Grid(defaultStartPoint, defaultEndpoint);

export type UserInput = {
  go: HTMLButtonElement | null;
  tick: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
  speed: HTMLSelectElement | null;
  algo: HTMLSelectElement | null;
  diagonal: HTMLSelectElement | null;
  showCost: HTMLSelectElement | null;
};

export const html: UserInput = {
  go: null,
  tick: null,
  reset: null,
  speed: null,
  algo: null,
  diagonal: null,
  showCost: null,
};

export const state: State = {
  dragging: false,
  currentType: TileType.Wall,
  diagonal: false,
  speed: "medium",
  algo: "Djikstra",
  showCost: false,
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
