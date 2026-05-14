import { Algo } from "./algos/algo_types.js";
import { IterableAStar } from "./algos/IterableAStar.js";
import { IterableDijkstra } from "./algos/IterableDijkstra.js";
import { Grid, Tile, TileType } from "./grid/Grid.js";

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
  diagonal: boolean;
  showCost: boolean;
  currentAlgo?: IterableDijkstra | IterableAStar;
  currentLoop?: number;
  tickType?: Algo.ActionType;
  currentVisitedTile?: Tile;
  speed: Speed;
  algo: AlgoType;
};

export type Speed = "slow" | "medium" | "fast";

export type AlgoType = "Dijkstra" | "A*";
