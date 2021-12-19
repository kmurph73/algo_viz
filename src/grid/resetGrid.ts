import {
  grid,
  defaultEndpoint,
  defaultStartPoint,
  NumColumns,
  NumRows,
  state,
} from "../constants.js";
import { pointsEq } from "../structs/point.js";
import { tileTexts, TileType } from "./Grid.js";

export const resetGrid = (): void => {
  grid.startPoint = defaultStartPoint;
  grid.endPoint = defaultEndpoint;
  state.currentVisitedTile = undefined;

  for (let y = 0; y <= NumRows; y++) {
    for (let x = 0; x <= NumColumns; x++) {
      const tile = grid.at(x, y)!;

      if (tile.type === TileType.Gutter) {
        continue;
      }

      tile.td.classList.remove(
        "visited",
        "queued",
        "currentnode",
        "yellow-brick"
      );

      const type = ((): TileType => {
        if (pointsEq(tile.point, defaultStartPoint)) {
          return TileType.Start;
        } else if (pointsEq(tile.point, defaultEndpoint)) {
          return TileType.End;
        } else {
          return TileType.Empty;
        }
      })();

      tile.type = type;
      tile.td.innerText = tileTexts[type];
    }
  }
};
