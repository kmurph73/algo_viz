export var TileType;
(function (TileType) {
    TileType[TileType["Empty"] = 0] = "Empty";
    TileType[TileType["Wall"] = 1] = "Wall";
    TileType[TileType["Gutter"] = 2] = "Gutter";
})(TileType || (TileType = {}));
export class Grid {
    tiles;
    constructor() {
        this.tiles = [];
    }
}
