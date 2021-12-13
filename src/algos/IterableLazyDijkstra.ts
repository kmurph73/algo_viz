import { pointsEq } from "../structs/point.js";
import { UniqueQueue } from "./UniqueQueue.js";

type Point = { row: number; col: number };

type Props = {
  start: Point;
  end: Point;
  canEnterTile: (row: number, col: number) => boolean;
  getNeighbors: (row: number, col: number) => Point[];

  diagonal: boolean;
};

export enum ActionType {
  Enqueued = 1,
  Visit,
  Found,
  NoMas,
}

type Node = {
  point: Point;
  prev: Node | null;
  value: number;
};

const getPath = (lastNode: Node): Point[] => {
  const path: Point[] = [lastNode.point];
  let prev = lastNode.prev;

  while (prev != null) {
    path.push(prev.point);
    prev = prev.prev;
  }

  return path.reverse();
};

export class IterableLazyDijkstra {
  visited: Record<string, Node>;
  awaitingVisit: UniqueQueue<Point>;
  start: Point;
  end: Point;
  totalTicks: number;
  canEnterTile: (row: number, col: number) => boolean;
  getNeighbors: (row: number, col: number) => Point[];
  currentNode: Node;
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

    this.currentNeighbors = getNeighbors(start.row, start.col);
    this.currentNeighborsLength = this.currentNeighbors.length;
    this.canEnterTile = canEnterTile;
    this.getNeighbors = getNeighbors;
  }

  private visitNext(): { point: Point; type: ActionType } {
    const { row, col } = this.currentNode.point;
    this.visited[`${row},${col}`] = this.currentNode;

    const nextPoint = this.awaitingVisit.dequeue();
    if (nextPoint) {
      const nextNode: Node = {
        point: nextPoint,
        prev: this.currentNode,
        value: this.currentNode.value + 1,
      };

      this.currentNode = nextNode;
      this.currentNeighbors = this.getNeighbors(nextPoint.row, nextPoint.col);
      this.currentNeighborsLength = this.currentNeighbors.length;
      this.neighborIndex = 0;

      return { point: nextPoint, type: ActionType.Visit };
    } else {
      return { point: this.currentNode.point, type: ActionType.NoMas };
    }
  }

  next(): { point: Point; type: ActionType; path?: Point[] } {
    this.totalTicks += 1;
    while (this.neighborIndex < this.currentNeighborsLength) {
      const point = this.currentNeighbors[this.neighborIndex]!;

      if (pointsEq(point, this.end)) {
        const node: Node = {
          point,
          prev: this.currentNode,
          value: this.currentNode.value + 1,
        };
        const path = getPath(node);

        return { point, type: ActionType.Found, path };
      }

      const { row, col } = point;
      this.neighborIndex += 1;

      const visited = this.visited[`${row},${col}`];
      if (visited) {
        continue;
      }

      if (this.canEnterTile(row, col)) {
        const result = this.awaitingVisit.enqueue(`${row},${col}`, point);

        if (result) {
          return { point, type: ActionType.Enqueued };
        }
      }
    }

    return this.visitNext();
  }
}
