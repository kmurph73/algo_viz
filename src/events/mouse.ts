import { grid, state } from "../constants.js";
import { Tile, tileTexts, TileType } from "../grid/Grid.js";

export const isHtml = (ele: any): ele is HTMLElement => {
  return ele.classList != null;
};

export const findValidClickedOnTile = (
  event: PointerEvent
): Tile | undefined => {
  const path = event.composedPath();
  const td = path.find((ele) =>
    isHtml(ele) ? ele.classList.contains("tile") : false
  ) as HTMLElement | undefined;

  if (td && !td.classList.contains("gutter")) {
    const row = parseInt(td.dataset.row!);
    const col = parseInt(td.dataset.col!);

    const tile = grid.at(row, col);
    if (!tile) {
      throw new Error(`tile ${row},${col} should be here`);
    }

    return tile;
  }
};

const moveNode = (origin: Tile, dest: Tile): void => {
  const char = origin.type === TileType.Start ? "@" : "$";

  state.currentType = null;
  dest.div.innerText = char;
  dest.type = origin.type;
  dest.td.dataset.type = origin.type.toString();

  const algo = state.currentAlgo;

  if (origin.type === TileType.Start) {
    grid.startPoint = dest.point;
    if (algo) {
      algo.start = dest.point;
    }
  } else {
    grid.endPoint = dest.point;

    if (algo) {
      algo.end = dest.point;
    }
  }

  origin.td.classList.remove("selected");
  origin.div.innerText = "";
  origin.type = TileType.Empty;
};

export const mousedown = (event: Event) => {
  const tile = findValidClickedOnTile(event as PointerEvent);

  if (tile) {
    state.dragging = false;

    switch (tile.type) {
      case TileType.Start:
        if (state.currentType === TileType.End) {
          return;
        } else if (state.currentType === TileType.Start) {
          state.currentType = null;
          tile.td.classList.remove("selected");
          return;
        }

        state.currentType = TileType.Start;
        tile.td.classList.add("selected");
        break;
      case TileType.Empty:
        if (state.currentType === TileType.Start) {
          moveNode(grid.startTile()!, tile);
        } else if (state.currentType === TileType.End) {
          moveNode(grid.endTile()!, tile);
        } else {
          state.dragging = true;
          state.currentType = TileType.Wall;
          tile.div.innerText = "#";
        }
        break;
      case TileType.Wall:
        if (state.currentType === TileType.Start) {
          moveNode(grid.startTile()!, tile);
        } else if (state.currentType === TileType.End) {
          moveNode(grid.endTile()!, tile);
        } else {
          state.dragging = true;
          state.currentType = TileType.Empty;
          tile.div.innerText = "";
        }
        break;
      case TileType.End:
        if (state.currentType === TileType.Start) {
          return;
        } else if (state.currentType === TileType.End) {
          state.currentType = null;
          tile.td.classList.remove("selected");
        }

        state.currentType = TileType.End;
        tile.td.classList.add("selected");
        break;
      default:
        break;
    }
  }

  return false;
};

export const mouseup = (event: Event) => {
  state.dragging = false;

  const tile = findValidClickedOnTile(event as PointerEvent);

  if (tile) {
    switch (tile.type) {
      case TileType.Empty:
        if (state.currentType === TileType.Start) {
          moveNode(grid.startTile()!, tile);
        } else if (state.currentType === TileType.End) {
          moveNode(grid.endTile()!, tile);
        }
        break;
      case TileType.Wall:
        if (state.currentType === TileType.Start) {
          moveNode(grid.startTile()!, tile);
        } else if (state.currentType === TileType.End) {
          moveNode(grid.endTile()!, tile);
        }
        break;
    }
  }
};

const dragTypes = [TileType.Wall, TileType.Empty];

export const mousemove = (event: Event) => {
  if (!state.currentType) {
    return;
  }

  if (state.dragging) {
    const tile = findValidClickedOnTile(event as PointerEvent);

    if (tile) {
      const type = tile.type;

      if (tile && dragTypes.includes(type)) {
        const div = tile.div;

        div.innerText = tileTexts[state.currentType];
        tile.type = state.currentType;
        tile.td.dataset.type = state.currentType.toString();
      }
    }
  }
};
