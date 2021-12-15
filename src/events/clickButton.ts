import { appDijkstra, startLooping, tick } from "../app_util/appDjikstra.js";
import { actions, state } from "../constants.js";
import { resetGrid } from "../grid/resetGrid.js";
import { Speed } from "../types.js";

export const assignActions = (): void => {
  actions.go = unwrap(document.getElementById("go"));
  actions.tick = unwrap(document.getElementById("tick"));
  actions.go = unwrap(document.getElementById("go"));
  actions.go = unwrap(document.getElementById("go"));
};

export const attachEvents = (): void => {
  const goButton = actions.go!;
  goButton.addEventListener("click", (e) => {
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = undefined;
      goButton.innerText = "go";
    } else if (state.currentAlgo) {
      goButton.innerText = "stop";
      startLooping(state.currentAlgo);
    } else {
      goButton.innerText = "stop";
      appDijkstra();
    }
  });

  document.getElementById("tick")!.addEventListener("click", (e) => {
    tick();
  });

  document.getElementById("reset")!.addEventListener("click", (e) => {
    resetGrid();
    state.currentAlgo = undefined;

    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = undefined;
    }

    goButton.innerText = "go";
  });

  document.getElementById("speed_select")!.addEventListener("change", (e) => {
    const select = e.target as HTMLSelectElement;
    const speed = select.value as Speed;
    state.speed = speed;
  });

  // document.getElementById("save")!.addEventListener("click", (e) => {
  //   console.log("save");
  // });
};
