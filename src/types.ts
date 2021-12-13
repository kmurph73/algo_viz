import { IterableLazyDijkstra } from "./algos/IterableLazyDijkstra";
import { Grid, TileType } from "./grid/Grid";

declare global {
  interface Window {
    main: () => void;
    App: {
      state: State;
      grid: Grid;
    };
  }
}

export type State = {
  dragging: boolean;
  currentType: TileType | null;
  allowDiagonal: boolean;
  currentAlgo?: IterableLazyDijkstra;
  currentLoop?: number;
};
