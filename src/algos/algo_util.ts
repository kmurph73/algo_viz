import { Point } from "../structs/point.js";
import { Algo } from "./algo_types.js";

export const getPath = (lastNode: Algo.Node): Point[] => {
  const path: Point[] = [lastNode.point];
  let prev = lastNode.prev;

  while (prev != null) {
    path.push(prev.point);
    prev = prev.prev;
  }

  return path.reverse();
};

export const manhattanDistance = (p1: Point, p2: Point) => {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);

  return dx + dy;
};

export const diagonalDistance = (p1: Point, p2: Point) => {
  return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
};

export const euclideanDistance = (p1: Point, p2: Point) => {
  let y = p2.x - p1.x;
  let x = p2.y - p1.y;

  return Math.sqrt(x * x + y * y);
};
