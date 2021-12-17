import { NumColumns, NumRows, } from "../constants.js";
export var TileType;
(function (TileType) {
    TileType[TileType["Empty"] = 1] = "Empty";
    TileType[TileType["Wall"] = 2] = "Wall";
    TileType[TileType["Gutter"] = 3] = "Gutter";
    TileType[TileType["Start"] = 4] = "Start";
    TileType[TileType["End"] = 5] = "End";
})(TileType || (TileType = {}));
export const tileTexts = {
    [TileType.Empty]: "",
    [TileType.Start]: "@",
    [TileType.Wall]: "#",
    [TileType.End]: "$",
    [TileType.Gutter]: "nada",
};
export class Grid {
    tiles;
    startPoint;
    endPoint;
    constructor(start, end) {
        this.tiles = [];
        this.startPoint = start;
        this.endPoint = end;
    }
    startTile() {
        return this.atPoint(this.startPoint);
    }
    endTile() {
        return this.atPoint(this.endPoint);
    }
    at(x, y) {
        const rowArray = this.tiles[y];
        if (!rowArray) {
            return null;
        }
        return rowArray[x] || null;
    }
    tdAt(x, y) {
        const td = this.at(x, y)?.td;
        if (!td) {
            throw new Error(`td should be naw: ${x},${y}`);
        }
        return td;
    }
    atPoint({ x, y }) {
        return this.at(x, y);
    }
    saveToLocalStorage() {
        const json = {
            walls: [],
            start: this.startPoint,
            end: this.endPoint,
        };
        for (let index = 0; index <= NumRows; index++) {
            const row = this.tiles[index];
            for (let index = 0; index <= NumColumns; index++) {
                const tile = row[index];
                if (tile.type === TileType.Empty) {
                    const { x, y } = tile.point;
                    json.walls.push([x, y]);
                }
            }
        }
        localStorage.setItem("grid", JSON.stringify(json));
    }
}
