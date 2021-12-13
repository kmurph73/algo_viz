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
  for (let row = 0; row <= NumRows; row++) {
    for (let col = 0; col <= NumColumns; col++) {
      if (row === 0) {
        const div = grid.at(row, col)!.td;
        div.innerText = col.toString();
      }

      if (col === 0) {
        const tile = grid.at(row, col)!;
        tile.td.innerText = row.toString();
        tile.td.dataset.type = TileType.Gutter.toString();
      }
    }
  }
};

export const drawNodes = (): void => {
  const startTile = grid.atPoint(grid.startPoint)!;
  const endTile = grid.atPoint(grid.endPoint)!;

  startTile.td.innerText = "@";
  startTile.td.dataset.type = TileType.Start.toString();
  startTile.type = TileType.Start;

  endTile.td.innerText = "$";
  endTile.td.dataset.type = TileType.End.toString();
  endTile.type = TileType.End;
};
