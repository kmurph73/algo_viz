import { TileType } from "./grid/Grid";

declare global {
  interface Window {
    main: () => void;
    state: State;
  }
}

export type State = {
  dragging: boolean;
  currentType: TileType | null;
  allowDiagonal: boolean;
};
