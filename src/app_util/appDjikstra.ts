import {
  ActionType,
  IterableLazyDijkstra,
} from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import { Tile, TileType } from "../grid/Grid.js";
import { Point } from "../structs/point.js";

const cardinalNeighbors: [string, Point][] = [
  ["north", { row: 1, col: 0 }],
  ["east", { row: 0, col: 1 }],
  ["south", { row: -1, col: 0 }],
  ["west", { row: 0, col: -1 }],
];

const allNeighbors: [string, Point][] = [
  ["north", { row: 1, col: 0 }],
  ["east", { row: 0, col: 1 }],
  ["south", { row: -1, col: 0 }],
  ["west", { row: 0, col: -1 }],

  ["northEast", { row: 1, col: 1 }],
  ["southEast", { row: -1, col: 1 }],
  ["southWest", { row: -1, col: -1 }],
  ["northWest", { row: 1, col: -1 }],
];

const addPoints = (p1: Point, p2: Point): Point => {
  return { row: p1.row + p2.row, col: p1.col + p2.col };
};

export const getNeighbors = (
  row: number,
  col: number,
  diagonal: boolean
): Point[] => {
  const points: Point[] = [];

  const directions = diagonal ? allNeighbors : cardinalNeighbors;

  for (let index = 0; index < directions.length; index++) {
    const point = directions[index]![1];

    const nextPoint = addPoints(point, { row, col });

    points.push(nextPoint);
  }

  return points;
};

export const getDiagonalNeighbors = (row: number, col: number): Point[] => {
  return getNeighbors(row, col, true);
};

export const getCardinalNeighbors = (row: number, col: number): Point[] => {
  return getNeighbors(row, col, false);
};

const canEnterTile = (row: number, col: number): boolean => {
  const tile = grid.at(row, col);

  return tile != null && tile.type === TileType.Empty;
};

const walkToDest = (path: Point[]): void => {
  let steps = 0;
  const dest = path.length - 1;
  const walk = setInterval(() => {
    if (steps <= dest) {
      const point = path[steps]!;
      const tile = grid.atPoint(point)!;
      tile.td.classList.add("yellow-brick");

      steps += 1;
    } else {
      window.clearInterval(walk);
    }
  }, 100);
};

export const startLooping = (algo: IterableLazyDijkstra): void => {
  const loop = setInterval(() => {
    const next = algo.next();
    const tile = grid.atPoint(next.point)!;

    handleTick(tile, next.type);

    if (ActionType.Found === next.type) {
      clearInterval(loop);
      const path = next.path;
      if (!path) {
        throw new Error("end node found, path should be here");
      }

      walkToDest(path);
    }
  }, 30);

  state.currentLoop = loop;
};

export const appDijkstra = (): void => {
  const algo = initDijkstra();
  state.currentAlgo = algo;

  startLooping(algo);
};

const initDijkstra = (): IterableLazyDijkstra => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.allowDiagonal;

  return new IterableLazyDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: getCardinalNeighbors,
    diagonal,
  });
};

export const handleTick = (tile: Tile, action: ActionType): void => {
  const classList = tile.td.classList;
  if (action === ActionType.Visit) {
    classList.remove("queued");
    classList.add("currentnode");

    if (state.currentVisitedTile) {
      const cl = state.currentVisitedTile.td.classList;
      cl.remove("currentnode");
      cl.add("visited");
    }

    state.currentVisitedTile = tile;
  } else {
    classList.add("queued");
  }
};

export const tick = (): void => {
  if (!state.currentAlgo) {
    state.currentAlgo = initDijkstra();
  }

  const algo = state.currentAlgo!;

  const next = algo.next();
  const tile = grid.atPoint(next.point)!;
  handleTick(tile, next.type);
};
