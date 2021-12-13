import { grid, NumColumns, NumRows } from "../constants.js";
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

  for (let row = 0; row <= NumRows; row++) {
    for (let col = 0; col <= NumColumns; col++) {
      const tile = grid.at(row, col)!;

      if (tile.type === TileType.Gutter) {
        continue;
      }

      tile.div.classList.remove("red", "blue");
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
      tile.div.innerText = tileTexts[type];
    }
  }
};
