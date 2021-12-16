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

export const manhattanDistance = (node1: Point, node2: Point) => {
  const dx = Math.abs(node1.x - node2.x);
  const dy = Math.abs(node1.y - node2.y);

  return dx + dy;
};
