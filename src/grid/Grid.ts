import { NumColumns, NumRows } from "../constants.js";

export type Point = {
  row: number;
  col: number;
};

export enum TileType {
  Empty = 1,
  Wall,
  Gutter,
  Start,
  End,
}

export type Tile = {
  point: Point;
  div: HTMLElement;
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

  divAt(row: number, col: number): HTMLElement {
    const div = this.at(row, col)?.div;

    if (!div) {
      throw new Error(`div should be naw: ${row},${col}`);
    }

    return div;
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
