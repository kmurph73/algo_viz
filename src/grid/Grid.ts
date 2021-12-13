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
};

export const tileTexts = {
  [TileType.Empty]: "",
  [TileType.Start]: "@",
  [TileType.Wall]: "#",
  [TileType.End]: "$",
  [TileType.Gutter]: "nada",
};

type localJSON = { walls: Array<[number, number]>; start: Point; end: Point };

export const initialStartPoint = { row: 1, col: 1 };
export const initialEndPoint = { row: 10, col: 10 };

export class Grid {
  tiles: Tile[][];
  startPoint: Point;
  endPoint: Point;

  constructor() {
    this.tiles = [];
    this.startPoint = initialStartPoint;
    this.endPoint = initialEndPoint;
  }

  startTile(): Tile | null {
    return this.atPoint(this.startPoint);
  }

  endTile(): Tile | null {
    return this.atPoint(this.endPoint);
  }

  at(row: number, col: number): Tile | null {
    const rowArray = this.tiles[row];

    if (!rowArray) {
      return null;
    }

    return rowArray[col] || null;
  }

  tdAt(row: number, col: number): HTMLElement {
    const td = this.at(row, col)?.td;

    if (!td) {
      throw new Error(`td should be naw: ${row},${col}`);
    }

    return td;
  }

  atPoint({ row, col }: Point): Tile | null {
    return this.at(row, col);
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
          const { row, col } = tile.point;
          json.walls.push([row, col]);
        }
      }
    }

    localStorage.setItem("grid", JSON.stringify(json));
  }
}
