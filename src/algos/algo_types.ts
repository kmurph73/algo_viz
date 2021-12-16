import { Point } from "../structs/point";

export namespace Algo {
  export type Node = {
    point: Point;
    prev: Node | null;
    value: number;
  };

  export type Props = {
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

  export type Tick = { point: Point; type: ActionType; path?: Point[] };
}
