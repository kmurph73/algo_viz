import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 20;
export const NumColumns = 20;

export const grid = new Grid();

type Buttons = {
  go: HTMLButtonElement | null;
  tick: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
};

type Selects = {
  speed: HTMLSelectElement | null;
};

export const buttons: Buttons = {
  go: null,
  tick: null,
  reset: null,
};

export const selects: Selects = {
  speed: null,
};

export const state: State = {
  dragging: false,
  currentType: TileType.Wall,
  allowDiagonal: false,
  speed: "medium",
};
