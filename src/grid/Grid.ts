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

export class Grid {
  tiles: Tile[][];
  startPoint: Point;
  endPoint: Point;

  constructor() {
    this.tiles = [];
    this.startPoint = { row: 1, col: 1 };
    this.endPoint = { row: 10, col: 10 };
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
}
