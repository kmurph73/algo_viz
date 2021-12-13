import { appDijkstra, startLooping, tick } from "../app_util/appDjikstra.js";
import { state } from "../constants.js";
import { resetGrid } from "../grid/resetGrid.js";
import { Speed } from "../types.js";

export const attachEvents = () => {
  const goButton = document.getElementById("go")!;
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
