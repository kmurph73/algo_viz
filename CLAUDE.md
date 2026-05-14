# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Browser-based visualizer for Dijkstra's algorithm and A* pathfinding on a grid. Plain TypeScript + DOM (no framework). Deployed to GitHub Pages: https://kmurph73.github.io/algo_viz/.

## Commands

Package manager: **yarn**. Test runner: **ava**.

- `yarn buildjs` — clean `dist/` and compile TypeScript via `tsc`. Tests run against the compiled output, so re-run this before `yarn test` after edits.
- `yarn test` — runs ava against `./dist/test/*.js` (compiled output, not `.ts` sources). Run a single file with `NODE_ENV=test ava ./dist/test/test.js` (or `testQueue.js`).
- `yarn testbug` — debug a specific test file (`./dist/test/testQueue.js`) with `--break`.
- `yarn serve` — serve the repo root via `http-server`. `index.html` loads `/dist/src/main.js` directly, so run `yarn buildjs` first.
- `yarn buildapp` — production build: compile TS, then run `dist/scripts/build.js` which bundles `dist/src/main.js` and `css/app.css` via esbuild into timestamped files under `build/` and rewrites `index.html` to point to them.
- `yarn deploy` — `buildapp` then `deploy-to-gh-pages.sh`, which `git subtree split`s the `build/` directory to the `ghpageplz` branch and pushes it.

TS config: ESNext modules + `noUncheckedIndexedAccess`. Imports use explicit `.js` extensions (compiled ESM resolution). Keep that convention when adding files.

## Architecture

The flow is: user clicks a button → handler in `src/state_changes/` mutates the singleton `state` object in `src/constants.ts` → DOM is updated imperatively. There is no reactive layer; the `Grid` owns references to `HTMLElement`s and handlers manipulate `classList` / `innerText` directly.

### Singletons in `src/constants.ts`
- `grid: Grid` — the board (rows × columns of `Tile`s, each holding its own `HTMLElement`).
- `state: State` — current algo, speed, dragging flag, the in-progress `currentAlgo` iterator, `currentLoop` interval id, etc.
- `html: UserInput` — references to the buttons/selects, populated by `assignHTMLElements()` at startup.

Both `state` and `grid` are exposed on `window.App` for in-browser debugging.

### Algorithm iterators (`src/algos/`)
`IterableDijkstra` and `IterableAStar` implement a step-at-a-time interface via `next(): Algo.Tick`. Each tick returns one of four `Algo.ActionType` values — `Enqueued`, `Visit`, `Found`, `NoMas` — letting the UI animate a single algorithm step per frame. The iterators are injected with `canEnterTile` and `getNeighbors` callbacks (see `src/app_util/app_util.ts`), so they're decoupled from the DOM grid and testable in isolation (see `test/test.ts`).

Dijkstra uses a FIFO `Queue` (with an internal `Set` for O(1) `has()` membership checks to avoid re-enqueueing). A* uses `PriorityQueue` keyed on `g(n) + h(n)`; `h(n)` is Manhattan or Euclidean distance depending on whether diagonal movement is enabled.

### State-change handlers (`src/state_changes/`)
One file per UI action. `tick.ts` is the core loop — on each tick it lazily constructs the algorithm iterator (`initDijkstra` / `initAStar`), advances it once, and updates the matching `Tile`'s CSS class (`queued` → `currentnode` → `visited`, plus `yellow-brick` for the final path drawn by `walkToDest`). `go.ts` sets up the `setInterval` that drives auto-play at the selected speed.

### Naming quirks
- `Algo.ActionType.NoMas` = search exhausted with no path.
