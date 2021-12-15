import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra.js";
import { grid, state } from "../constants.js";
import { TileType } from "../grid/Grid.js";
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

export const walkToDest = (path: Point[]): void => {
  let steps = 0;
  const len = path.length - 1;
  const walk = setInterval(() => {
    if (steps <= len) {
      const point = path[steps]!;
      const tile = grid.atPoint(point)!;
      tile.td.classList.add("yellow-brick");

      steps += 1;
    } else {
      window.clearInterval(walk);
    }
  }, 30);
};

export const initDijkstra = (): IterableLazyDijkstra => {
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
