import { NumRows, NumColumns, grid } from "../constants.js";
import { TileType } from "./Grid.js";

export const drawGrid = (): void => {
  let html = "<table class='grid'><tbody>";

  let rowCount = 0;
  let colCount = 0;

  while (rowCount <= NumRows) {
    html += `<tr>`;

    while (colCount <= NumColumns) {
      const className = `${
        colCount === 0 || NumRows === rowCount ? "gutter" : "tile"
      }`;
      html += `<td class="${className}"></td>`;
      colCount += 1;
    }

    html += "</tr>";
    rowCount += 1;
    colCount = 0;
  }

  html += "</tbody></table>";

  document.getElementById("grid_container")!.innerHTML = html;
};

export const drawGutterNumbers = (): void => {
  for (let y = 0; y <= NumRows; y++) {
    for (let x = 0; x <= NumColumns; x++) {
      if (y === 0) {
        const div = grid.at(x, y)!.td;
        div.innerText = x.toString();
      }

      if (x === 0) {
        const tile = grid.at(x, y)!;
        tile.td.innerText = y.toString();
      }
    }
  }
};

export const drawNodes = (): void => {
  const startTile = grid.atPoint(grid.startPoint)!;
  const endTile = grid.atPoint(grid.endPoint)!;

  startTile.td.innerText = "@";
  startTile.type = TileType.Start;

  endTile.td.innerText = "$";
  endTile.type = TileType.End;
};
