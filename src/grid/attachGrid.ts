import { grid } from "../constants.js";
import { Tile, TileType } from "./Grid.js";

export const attachGrid = (): void => {
  const container = document.getElementById("grid_container");
  if (!container) {
    throw new Error("couldn't find grid container div!");
  }

  const trs = [...container.querySelectorAll("table > tbody > tr")];

  // we want 0,0 at bottom left of grid
  trs.reverse();

  for (let row = 0; row < trs.length; row++) {
    const tr = trs[row]!;

    const tds = tr.children;

    const tiles: Tile[] = [];

    for (let col = 0; col < tds.length; col++) {
      const td = tds[col]! as HTMLElement;
      const div = td.children[0]! as HTMLElement;

      td.dataset.row = row.toString();
      td.dataset.col = col.toString();
      const type = td.classList.contains("gutter")
        ? TileType.Gutter
        : TileType.Empty;

      td.dataset.type = type.toString();

      const tile: Tile = {
        td,
        point: { row, col },
        type,
      };

      tiles.push(tile);
    }

    grid.tiles.push(tiles);
  }
};
