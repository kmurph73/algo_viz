import { NumColumns, NumRows } from "../constants.js";
import { Point } from "../structs/point.js";

export enum TileType {
  Empty = 1,
  Wall,
  Gutter,
  Start,
  End,
}

export type Tile = {
  point: Point;
  td: HTMLElement;
  type: TileType;
  weight: number | null;
};

export const tileTexts = {
  [TileType.Empty]: "",
  [TileType.Start]: "@",
  [TileType.Wall]: "#",
  [TileType.End]: "$",
  [TileType.Gutter]: "nada",
};

type localJSON = { walls: Array<[number, number]>; start: Point; end: Point };

export class Grid {
  tiles: Tile[][];
  startPoint: Point;
  endPoint: Point;

  constructor(start: Point, end: Point) {
    this.tiles = [];
    this.startPoint = start;
    this.endPoint = end;
  }

  startTile(): Tile | null {
    return this.atPoint(this.startPoint);
  }

  endTile(): Tile | null {
    return this.atPoint(this.endPoint);
  }

  at(x: number, y: number): Tile | null {
    const rowArray = this.tiles[y];

    if (!rowArray) {
      return null;
    }

    return rowArray[x] || null;
  }

  tdAt(x: number, y: number): HTMLElement {
    const td = this.at(x, y)?.td;

    if (!td) {
      throw new Error(`td should be naw: ${x},${y}`);
    }

    return td;
  }

  atPoint({ x, y }: Point): Tile | null {
    return this.at(x, y);
  }

  saveToLocalStorage(): void {
    const json: localJSON = {
      walls: [],
      start: this.startPoint,
      end: this.endPoint,
    };

    for (let index = 0; index <= NumRows; index++) {
      const row = this.tiles[index]!;

      for (let index = 0; index <= NumColumns; index++) {
        const tile = row[index]!;

        if (tile.type === TileType.Empty) {
          const { x, y } = tile.point;
          json.walls.push([x, y]);
        }
      }
    }

    localStorage.setItem("grid", JSON.stringify(json));
  }
}
