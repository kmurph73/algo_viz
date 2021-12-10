// import { grid, state } from "../constants.js";
// import { then } from "../util/util.js";

export const add = (n: number) => n + 1;
// const dequeue = <T>(set: Set<T>): T | undefined => {
//   const [t] = set;
//   if (t) {
//     set.delete(t);
//   }

//   return t;
// };

// export const onclicky = (e: Event) => {
//   const event = e as PointerEvent;
//   const path = event.composedPath();
//   const tile = path.find((ele) =>
//     isHtml(ele) ? ele.classList.contains("tile") : false
//   );

//   if (tile) {
//     const td = tile as HTMLElement;

//     const col = td.dataset.col;
//     const row = td.dataset.row;

//     if (!col || !row) {
//       throw new Error("col && row should be here");
//     }

//     const point = { row: parseInt(row), col: parseInt(col) };
//     const div = grid.atPoint(point)!.div;

//     const queued = state.queued;
//     div.innerText = then(div.innerText, (text) => {
//       switch (text) {
//         case "@":
//           state.queued.add("@");
//           return "";
//         case "#":
//           return then(dequeue(queued), (sym) => {
//             return sym ? sym : "";
//           });
//         case "":
//           return then(dequeue(queued), (sym) => {
//             return sym ? sym : "#";
//           });
//         case "$":
//           state.queued.add("$");
//           return "";
//         default:
//           throw new Error("shouldnt get here");
//       }
//     });
//   }
// };
