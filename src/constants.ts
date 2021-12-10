import { Grid, TileType } from "./grid/Grid.js";
import { State } from "./types.js";

export const NumRows = 20;
export const NumColumns = 20;

export const grid = new Grid();

export const state: State = {
  dragging: false,
  currentType: TileType.Wall,
  allowDiagonal: false,
};
