import {
  ActionType,
  IterableLazyDijkstra,
} from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import { Tile, TileType } from "../grid/Grid.js";
import { addPoints, Point } from "../structs/point.js";

const manhattanNeighbors: [string, Point][] = [
  ["north", { x: 0, y: 1 }],
  ["east", { x: 1, y: 0 }],
  ["south", { x: 0, y: -1 }],
  ["west", { x: -1, y: 0 }],
];

const allNeighbors: [string, Point][] = [
  ["north", { x: 0, y: 1 }],
  ["east", { x: 1, y: 0 }],
  ["south", { x: 0, y: -1 }],
  ["west", { x: -1, y: 0 }],

  ["northEast", { x: 1, y: 1 }],
  ["southEast", { x: 1, y: -1 }],
  ["southWest", { x: -1, y: -1 }],
  ["northWest", { x: -1, y: 1 }],
];

export const getNeighbors = (
  x: number,
  y: number,
  diagonal: boolean
): Point[] => {
  const points: Point[] = [];

  const directions = diagonal ? allNeighbors : manhattanNeighbors;

  for (let index = 0; index < directions.length; index++) {
    const point = directions[index]![1];

    const nextPoint = addPoints(point, { x, y });

    points.push(nextPoint);
  }

  return points;
};

export const getDiagonalNeighbors = (x: number, y: number): Point[] => {
  return getNeighbors(x, y, true);
};

export const getManhattanNeighbors = (x: number, y: number): Point[] => {
  return getNeighbors(x, y, false);
};

const canEnterTile = (x: number, y: number): boolean => {
  const tile = grid.at(x, y);

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
  }, 30);
};

export const getSpeed = (): number => {
  switch (state.speed) {
    case "slow":
      return 60;
    case "medium":
      return 30;
    case "fast":
      return 1;
  }
};

export const startLooping = (algo: IterableLazyDijkstra): void => {
  const speed = getSpeed();
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
  }, speed);

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
    getNeighbors: getManhattanNeighbors,
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
