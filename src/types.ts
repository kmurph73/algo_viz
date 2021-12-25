import { Algo } from "./algos/algo_types";
import { IterableAStar } from "./algos/IterableAStar";
import { IterableDijkstra } from "./algos/IterableDijkstra";
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

export type AlgoType = "Djikstra" | "A*";
