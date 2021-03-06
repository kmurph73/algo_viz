import { grid, state } from "./constants.js";
import { assignHTMLElements, attachEvents } from "./events/handleEvents.js";
import { mousedown, mousemove, mouseup } from "./events/mouse.js";
import { attachGrid } from "./grid/attachGrid.js";
import { drawGrid, drawGutterNumbers, drawNodes } from "./grid/drawGrid.js";

const main = () => {
  drawGrid();
  attachGrid();
  drawGutterNumbers();
  drawNodes();
  assignHTMLElements();
  attachEvents();

  document.body.addEventListener("mousedown", mousedown);
  document.body.addEventListener("mouseup", mouseup);
  document.body.addEventListener("mousemove", mousemove);
  // document.body.addEventListener("click", onclicky);
};

window.main = main;
window.App = { state, grid };
