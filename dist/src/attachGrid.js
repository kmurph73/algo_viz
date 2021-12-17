export const attachGrid = () => {
    const container = document.getElementById("grid_container");
    if (!container) {
        throw new Error("couldn't find grid container div!");
    }
    const trs = [...container.querySelectorAll("table > tbody > tr")];
    // we want 0,0 at bottom left of grid
    trs.reverse();
    for (let row = 0; row < trs.length; row++) {
        const tr = trs[row];
        const tds = tr.children;
        const tiles = [];
        for (let col = 0; col < tds.length; col++) {
            const td = tds[col];
            const div = td.children[0];
            td.dataset.row = row.toString();
            td.dataset.col = col.toString();
            const tile = {
                div,
                pos: { row, col },
                type: TileType.Empty,
            };
            tiles.push(tile);
        }
        this.tiles.push(tiles);
    }
};
