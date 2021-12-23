import { pointsEq } from "../structs/point.js";
import { Algo } from "./algo_types.js";
import { getPath } from "./algo_util.js";
import { IterableLazyDijkstra } from "./IterableLazyDijkstra.js";
import { PriorityQueue } from "./PriorityQueue.js";

type Point = { x: number; y: number };

interface Node extends Algo.Node {
  g: number;
  h: number;
}

interface Props extends Algo.Props {
  heuristic: (p1: Point, p2: Point) => number;
}

export class IterableAStar {
  visited: Record<string, Node>;
  awaitingVisit: PriorityQueue<Node>;
  start: Point;
  end: Point;
  totalTicks: number;
  canEnterTile: (x: number, y: number) => boolean;
  getNeighbors: (x: number, y: number) => Point[];
  heuristic: (p1: Point, p2: Point) => number;
  currentNode: Node;
  neighborIndex: number;
  currentNeighbors: Point[];
  currentNeighborsLength: number;

  constructor({ start, end, canEnterTile, getNeighbors, heuristic }: Props) {
    this.visited = {};
    this.awaitingVisit = new PriorityQueue();

    this.heuristic = heuristic;
    this.start = start;
    this.end = end;
    this.totalTicks = 0;

    this.neighborIndex = 0;
    this.currentNode = {
      point: start,
      prev: null,
      value: 0,
      g: 0,
      h: 0,
    };

    this.currentNeighbors = getNeighbors(start.x, start.y);
    this.currentNeighborsLength = this.currentNeighbors.length;
    this.canEnterTile = canEnterTile;
    this.getNeighbors = getNeighbors;
  }

  private visitNext(): Algo.Tick {
    const { x, y } = this.currentNode.point;
    this.visited[`${x},${y}`] = this.currentNode;

    const nextNode = this.awaitingVisit.dequeue();
    if (nextNode) {
      const nextPoint = nextNode.point;
      this.currentNode = nextNode;
      this.currentNeighbors = this.getNeighbors(nextPoint.x, nextPoint.y);
      this.currentNeighborsLength = this.currentNeighbors.length;
      this.neighborIndex = 0;

      return { point: nextPoint, type: Algo.ActionType.Visit, cost: null };
    } else {
      return {
        point: this.currentNode.point,
        type: Algo.ActionType.NoMas,
        cost: null,
      };
    }
  }

  next(): Algo.Tick {
    this.totalTicks += 1;
    while (this.neighborIndex < this.currentNeighborsLength) {
      const point = this.currentNeighbors[this.neighborIndex]!;

      if (pointsEq(point, this.end)) {
        const node: Algo.Node = {
          point,
          prev: this.currentNode,
          value: this.currentNode.value + 1,
        };

        const path = getPath(node);

        return { point, type: Algo.ActionType.Found, path, cost: node.value };
      }

      const { x, y } = point;
      this.neighborIndex += 1;

      const id = `${x},${y}`;
      const visited = this.visited[id] != null;
      const queued = this.awaitingVisit.has(id);
      if (visited || queued) {
        continue;
      }

      if (this.canEnterTile(x, y)) {
        const prev = this.currentNode;
        const g = prev.g + 1;
        const h = this.heuristic(point, this.end);
        const node: Node = {
          point,
          prev: this.currentNode,
          g,
          h,
          value: g + h,
        };

        this.awaitingVisit.enqueue(`${x},${y}`, node);

        return { point, type: Algo.ActionType.Enqueued, cost: node.value };
      }
    }

    return this.visitNext();
  }

  isDijkstra(): this is IterableLazyDijkstra {
    return false;
  }
}
