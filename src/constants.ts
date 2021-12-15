import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 20;
export const NumColumns = 20;

export const grid = new Grid();

type ActionElements = {
  go: HTMLButtonElement | null;
  tick: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
  speed: HTMLButtonElement | null;
};

export const actions: ActionElements = {
  go: null,
  tick: null,
  reset: null,
  speed: null,
};

export const state: State = {
  dragging: false,
  currentType: TileType.Wall,
  allowDiagonal: false,
  speed: "medium",
};
