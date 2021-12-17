import { grid } from "../constants.js";
import { TileType } from "./Grid.js";
export const attachGrid = () => {
    const container = document.getElementById("grid_container");
    if (!container) {
        throw new Error("couldn't find grid container div!");
    }
    const trs = [...container.querySelectorAll("table > tbody > tr")];
    // we want 0,0 at bottom left of grid
    trs.reverse();
    for (let y = 0; y < trs.length; y++) {
        const tr = trs[y];
        const tds = tr.children;
        const tiles = [];
        for (let x = 0; x < tds.length; x++) {
            const td = tds[x];
            td.dataset.y = y.toString();
            td.dataset.x = x.toString();
            const type = td.classList.contains("gutter")
                ? TileType.Gutter
                : TileType.Empty;
            td.dataset.type = type.toString();
            const tile = {
                td,
                point: { x, y },
                type,
            };
            tiles.push(tile);
        }
        grid.tiles.push(tiles);
    }
};
