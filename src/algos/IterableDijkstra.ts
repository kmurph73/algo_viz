import { Point, pointsEq } from "../structs/point.js";
import { Algo } from "./algo_types.js";
import { getPath } from "./algo_util.js";
import { PriorityQueue } from "./PriorityQueue.js";

export class IterableDijkstra {
  visited: Record<string, Algo.Node>;
  awaitingVisit: PriorityQueue<Algo.Node>;
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
    this.awaitingVisit = new PriorityQueue();

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

  private stepCost(from: Point, to: Point): number {
    return from.x !== to.x && from.y !== to.y ? Math.SQRT2 : 1;
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
      const prev = this.currentNode;
      const stepCost = this.stepCost(prev.point, point);

      if (pointsEq(point, this.end)) {
        const value = prev.value + stepCost;
        const node: Algo.Node = { point, prev, value };
        const path = getPath(node);

        return { point, type: Algo.ActionType.Found, path, cost: value };
      }

      const { x, y } = point;
      this.neighborIndex += 1;

      const id = `${x},${y}`;
      if (this.visited[id] != null) {
        continue;
      }

      if (!this.canEnterTile(x, y)) {
        continue;
      }

      const value = prev.value + stepCost;
      const existing = this.awaitingVisit.getThing(id);
      if (existing && existing.value <= value) {
        continue;
      }
      if (existing) {
        this.awaitingVisit.remove(id);
      }

      const node: Algo.Node = { point, prev, value };
      this.awaitingVisit.enqueue(id, node);

      return { point, type: Algo.ActionType.Enqueued, cost: value };
    }

    return this.visitNext();
  }

  isDijkstra(): this is IterableDijkstra {
    return true;
  }
}
