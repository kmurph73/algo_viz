import { IterableLazyDijkstra } from "./algos/IterableLazyDijkstra";
import { Grid, Tile, TileType } from "./grid/Grid";

declare global {
  interface Window {
    main: () => void;
    yar: boolean;
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
  currentVisitedTile?: Tile;
  speed: Speed;
};

export type Speed = "slow" | "medium" | "fast";
