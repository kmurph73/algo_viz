import { grid, NumColumns, NumRows, state } from "../constants.js";

export const changeShowWeights = (e: Event) => {
  const checkbox = e.target as HTMLInputElement;

  state.showCost = checkbox.checked;

  for (let index = 0; index <= NumRows; index++) {
    const row = grid.tiles[index]!;

    for (let index = 0; index <= NumColumns; index++) {
      const tile = row[index]!;

      if (state.showCost && tile.cost) {
        tile.td.innerText = tile.cost.toString();
      } else if (!state.showCost && tile.cost) {
        tile.td.innerText = "";
      }
    }
  }
};
