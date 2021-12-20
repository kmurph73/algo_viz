import { enable } from "../app_util/html_util.js";
import { grid, NumColumns, NumRows, state } from "../constants.js";
import { pointsEq } from "../structs/point.js";
import { tileTexts, TileType } from "./Grid.js";

export const clearGrid = ({ keepWalls }: { keepWalls: boolean }): void => {
  state.currentVisitedTile = undefined;
  enable(["diagonal", "algo"]);

  for (let y = 0; y <= NumRows; y++) {
    for (let x = 0; x <= NumColumns; x++) {
      const tile = grid.at(x, y)!;

      if (tile.type === TileType.Gutter) {
        continue;
      }

      tile.cost = null;

      tile.td.classList.remove(
        "visited",
        "queued",
        "currentnode",
        "yellow-brick"
      );

      const type = ((): TileType => {
        if (pointsEq(tile.point, grid.startPoint)) {
          return TileType.Start;
        } else if (pointsEq(tile.point, grid.endPoint)) {
          return TileType.End;
        } else if (tile.type === TileType.Wall && keepWalls) {
          return TileType.Wall;
        } else {
          return TileType.Empty;
        }
      })();

      tile.type = type;
      tile.td.innerText = tileTexts[type];
    }
  }
};
