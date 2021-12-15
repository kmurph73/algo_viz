import { pointsEq } from "../structs/point.js";
import { UniqueQueue } from "./UniqueQueue.js";

type Point = { x: number; y: number };

type Props = {
  start: Point;
  end: Point;
  canEnterTile: (x: number, y: number) => boolean;
  getNeighbors: (x: number, y: number) => Point[];

  diagonal: boolean;
};

export enum ActionType {
  Enqueued = 1,
  Visit,
  Found,
  NoMas,
}

export type AlgoNode = {
  point: Point;
  prev: AlgoNode | null;
  value: number;
};

export type AlgoTick = { point: Point; type: ActionType; path?: Point[] };

const getPath = (lastNode: AlgoNode): Point[] => {
  const path: Point[] = [lastNode.point];
  let prev = lastNode.prev;

  while (prev != null) {
    path.push(prev.point);
    prev = prev.prev;
  }

  return path.reverse();
};

export class IterableLazyDijkstra {
  visited: Record<string, AlgoNode>;
  awaitingVisit: UniqueQueue<AlgoNode>;
  start: Point;
  end: Point;
  totalTicks: number;
  canEnterTile: (x: number, y: number) => boolean;
  getNeighbors: (x: number, y: number) => Point[];
  currentNode: AlgoNode;
  neighborIndex: number;
  currentNeighbors: Point[];
  currentNeighborsLength: number;

  constructor({ start, end, canEnterTile, getNeighbors }: Props) {
    this.visited = {};
    this.awaitingVisit = new UniqueQueue();

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

  private visitNext(): { point: Point; type: ActionType } {
    const { x, y } = this.currentNode.point;
    this.visited[`${x},${y}`] = this.currentNode;

    const nextNode = this.awaitingVisit.dequeue();
    if (nextNode) {
      const nextPoint = nextNode.point;
      this.currentNode = nextNode;
      this.currentNeighbors = this.getNeighbors(nextPoint.x, nextPoint.y);
      this.currentNeighborsLength = this.currentNeighbors.length;
      this.neighborIndex = 0;

      return { point: nextPoint, type: ActionType.Visit };
    } else {
      return { point: this.currentNode.point, type: ActionType.NoMas };
    }
  }

  next(): AlgoTick {
    this.totalTicks += 1;
    while (this.neighborIndex < this.currentNeighborsLength) {
      const point = this.currentNeighbors[this.neighborIndex]!;

      if (pointsEq(point, this.end)) {
        const node: AlgoNode = {
          point,
          prev: this.currentNode,
          value: this.currentNode.value + 1,
        };
        const path = getPath(node);

        return { point, type: ActionType.Found, path };
      }

      const { x, y } = point;
      this.neighborIndex += 1;

      const visited = this.visited[`${x},${y}`];
      if (visited) {
        continue;
      }

      if (this.canEnterTile(x, y)) {
        const node: AlgoNode = {
          point,
          prev: this.currentNode,
          value: this.currentNode.value + 1,
        };
        const result = this.awaitingVisit.enqueue(`${x},${y}`, node);

        if (result) {
          return { point, type: ActionType.Enqueued };
        }
      }
    }

    return this.visitNext();
  }
}
