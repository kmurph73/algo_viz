import {
  ActionType,
  IterableLazyDijkstra,
} from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import { TileType } from "../grid/Grid.js";

type Point = {
  row: number;
  col: number;
};

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

export const startLooping = (algo: IterableLazyDijkstra): void => {
  const loop = setInterval(() => {
    const next = algo.next();
    const tile = grid.atPoint(next.point)!;
    const klass = next.type === ActionType.Visit ? "red" : "blue";

    if (ActionType.Found === next.type) {
      clearInterval(loop);
    }

    switch (next.type) {
      case ActionType.Visit:
        tile.div.classList.remove("blue");
        tile.div.classList.add("red");
        break;
      case ActionType.Enqueued:
        tile.div.classList.add("blue");
      default:
        break;
    }

    tile.div.classList.add(klass);
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

export const tick = (): void => {
  if (!state.currentAlgo) {
    state.currentAlgo = initDijkstra();
  }

  const algo = state.currentAlgo!;

  const next = algo.next();
  const tile = grid.atPoint(next.point)!;
  const klass = next.type === ActionType.Visit ? "red" : "blue";
  tile.div.classList.add(klass);
};
