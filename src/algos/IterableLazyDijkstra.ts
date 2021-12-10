import { UniqueQueue } from "./UniqueQueue";

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
  Finished,
}

type Node = {
  point: Point;
  prev: Node | null;
  value: number;
};

export class IterableLazyDijkstra {
  visited: Record<string, Node>;
  awaitingVisit: UniqueQueue<Point>;
  start: Point;
  end: Point;
  canEnterTile: (row: number, col: number) => boolean;
  getNeighbors: (row: number, col: number) => Point[];
  diagonal: boolean;
  currentNode: Node;
  neighborIndex: number;
  currentNeighbors: Point[];

  constructor({ start, end, canEnterTile, getNeighbors, diagonal }: Props) {
    this.visited = {};
    this.awaitingVisit = new UniqueQueue();

    this.start = start;
    this.end = end;

    this.neighborIndex = 0;
    this.currentNode = {
      point: start,
      prev: null,
      value: 0,
    };

    this.currentNeighbors = getNeighbors(start.row, start.col);
    this.canEnterTile = canEnterTile;
    this.getNeighbors = getNeighbors;
    this.diagonal = diagonal;
  }

  next(): { point: Point; type: ActionType } {
    if (this.neighborIndex < this.currentNeighbors.length) {
      const point = this.currentNeighbors[this.neighborIndex]!;
      if (this.canEnterTile(point.row, point.col)) {
        this.awaitingVisit.enqueue(`${point.row},${point.col}`, point);
      }

      this.neighborIndex++;

      return { point, type: ActionType.Enqueued };
    } else {
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
        this.neighborIndex = 0;

        return { point: nextPoint, type: ActionType.Visit };
      } else {
        return { point: this.currentNode.point, type: ActionType.Finished };
      }
    }
  }
}
