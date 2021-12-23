import { Point, pointsEq } from "../structs/point.js";
import { Algo } from "./algo_types.js";
import { getPath } from "./algo_util.js";
import { Queue } from "./Queue.js";

export class IterableLazyDijkstra {
  visited: Record<string, Algo.Node>;
  awaitingVisit: Queue<Algo.Node>;
  start: Point;
  end: Point;
  totalTicks: number;
  canEnterTile: (x: number, y: number) => boolean;
  getNeighbors: (x: number, y: number) => Point[];
  currentNode: Algo.Node;
  neighborIndex: number;
  currentNeighbors: Point[];
  currentNeighborsLength: number;

  constructor({ start, end, canEnterTile, getNeighbors }: Algo.Props) {
    this.visited = {};
    this.awaitingVisit = new Queue();

    this.start = start;
    this.end = end;
    this.totalTicks = 0;

    this.neighborIndex = 0;
    this.currentNode = {
      point: start,
      prev: null,
      value: 0,
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
      const visited = this.visited[id];
      if (visited || this.awaitingVisit.has(id)) {
        continue;
      }

      if (this.canEnterTile(x, y)) {
        const node: Algo.Node = {
          point,
          prev: this.currentNode,
          value: this.currentNode.value + 1,
        };

        this.awaitingVisit.enqueue(id, node);

        return { point, type: Algo.ActionType.Enqueued, cost: node.value };
      }
    }

    return this.visitNext();
  }

  isDijkstra(): this is IterableLazyDijkstra {
    return true;
  }
}
