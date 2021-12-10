import { IterableLazyDijkstra } from "../algos/IterableLazyDijkstra";
import { grid, state } from "../constants";
import { TileType } from "../grid/Grid";

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

const getNeighbors = (row: number, col: number): Point[] => {
  const points: Point[] = [];

  const directions = state.allowDiagonal ? allNeighbors : cardinalNeighbors;

  for (let index = 0; index < directions.length; index++) {
    const point = directions[index]![1];

    const nextPoint = addPoints(point, { row, col });

    points.push(nextPoint);
  }

  return points;
};

const canEnterTile = (row: number, col: number): boolean => {
  const tile = grid.at(row, col);

  return tile != null && tile.type === TileType.Empty;
};

export const appDijkstra = (): void => {
  const start = grid.startPoint;
  const end = grid.endPoint;
  const diagonal = state.allowDiagonal;

  const algo = new IterableLazyDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors,
    diagonal,
  });
};
