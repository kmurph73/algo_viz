import { grid, NumColumns, NumRows, state } from "../constants.js";
import { pointsEq } from "../structs/point.js";
import {
  initialEndPoint,
  initialStartPoint,
  tileTexts,
  TileType,
} from "./Grid.js";

export const resetGrid = (): void => {
  grid.startPoint = initialStartPoint;
  grid.endPoint = initialEndPoint;
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
        if (pointsEq(tile.point, initialStartPoint)) {
          return TileType.Start;
        } else if (pointsEq(tile.point, initialEndPoint)) {
          return TileType.End;
        } else {
          return TileType.Empty;
        }
      })();

      tile.type = type;
      tile.td.dataset.type = type.toString();
      tile.td.innerText = tileTexts[type];
    }
  }
};
