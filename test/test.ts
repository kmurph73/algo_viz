import test from "ava";
import { Algo } from "../src/algos/algo_types.js";
import {
  manhattanDistance,
  octileDistance,
} from "../src/algos/algo_util.js";
import { IterableAStar } from "../src/algos/IterableAStar.js";
import { IterableDijkstra } from "../src/algos/IterableDijkstra.js";
import {
  getDiagonalNeighbors,
  getManhattanNeighbors,
} from "../src/app_util/app_util.js";

const bounded = (width: number, height: number, walls: Set<string> = new Set()) => {
  return (x: number, y: number): boolean => {
    if (x < 0 || y < 0 || x >= width || y >= height) return false;
    return !walls.has(`${x},${y}`);
  };
};

const runToCompletion = (algo: { next(): Algo.Tick }): Algo.Tick => {
  let result = algo.next();
  while (
    result.type !== Algo.ActionType.Found &&
    result.type !== Algo.ActionType.NoMas
  ) {
    result = algo.next();
  }
  return result;
};

test("short path", (t) => {
  const start = { x: 0, y: 0 };
  const end = { x: 2, y: 2 };
  const grid = Array(10).fill(1);

  for (let index = 0; index < 10; index++) {
    grid[index] = Array(10).fill(1);
  }

  const canEnterTile = (x: number, y: number): boolean => {
    const r = grid[y];
    if (!r) {
      return false;
    }

    return r[x] != null;
  };

  const algo = new IterableDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: getManhattanNeighbors,
  });

  let result = algo.next(); // 1

  t.is(result.type, Algo.ActionType.Enqueued);
  t.deepEqual(result.point, { x: 0, y: 1 });

  result = algo.next(); // 2

  t.is(result.type, Algo.ActionType.Enqueued);
  t.deepEqual(result.point, { x: 1, y: 0 });

  result = algo.next(); // 3

  t.is(result.type, Algo.ActionType.Visit);
  t.deepEqual(result.point, { x: 0, y: 1 });
  t.is(algo.neighborIndex, 0);

  result = algo.next(); // 4

  t.is(algo.neighborIndex, 1);
  t.is(result.type, Algo.ActionType.Enqueued);
  t.deepEqual(result.point, { x: 0, y: 2 });

  result = algo.next(); // 5

  t.is(algo.neighborIndex, 2);
  t.is(result.type, Algo.ActionType.Enqueued);
  t.deepEqual(result.point, { x: 1, y: 1 });

  result = algo.next(); // 6

  t.is(algo.neighborIndex, 0);
  t.is(result.type, Algo.ActionType.Visit);
  t.deepEqual(result.point, { x: 1, y: 0 });

  result = algo.next(); // 7

  t.is(result.type, Algo.ActionType.Enqueued);
  t.deepEqual(result.point, { x: 2, y: 0 });

  while (result.type !== Algo.ActionType.Found) {
    result = algo.next();
  }

  t.is(algo.totalTicks, 29);

  const path = result.path;
  t.deepEqual(path, [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ]);
});

test("no path", (t) => {
  const start = { x: 0, y: 0 };
  const end = { x: 2, y: 2 };
  const grid = Array(10).fill(1);

  for (let index = 0; index < 10; index++) {
    grid[index] = Array(10).fill(1);
  }

  const canEnterTile = (y: number, x: number): boolean => {
    return false;
  };

  const algo = new IterableDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: getManhattanNeighbors,
  });

  let result = algo.next();

  t.is(result.type, Algo.ActionType.NoMas);
});

test("A* finds short path on open grid", (t) => {
  const algo = new IterableAStar({
    start: { x: 0, y: 0 },
    end: { x: 2, y: 2 },
    canEnterTile: bounded(10, 10),
    getNeighbors: getManhattanNeighbors,
    heuristic: manhattanDistance,
  });

  const result = runToCompletion(algo);

  t.is(result.type, Algo.ActionType.Found);
  t.is(result.cost, 4);
  t.is(result.path!.length, 5);
  t.deepEqual(result.path![0], { x: 0, y: 0 });
  t.deepEqual(result.path![4], { x: 2, y: 2 });
});

test("Dijkstra: diagonal path beats orthogonal when diagonals enabled", (t) => {
  // Regression: previously the algo terminated on first sight of `end`, which
  // could return a 4-step orthogonal path (cost 4) instead of the 2-step
  // diagonal (cost 2√2 ≈ 2.83). Now it terminates on dequeue, so the cheaper
  // path wins.
  const algo = new IterableDijkstra({
    start: { x: 0, y: 0 },
    end: { x: 2, y: 2 },
    canEnterTile: bounded(5, 5),
    getNeighbors: getDiagonalNeighbors,
  });

  const result = runToCompletion(algo);

  t.is(result.type, Algo.ActionType.Found);
  t.is(result.cost, 2 * Math.SQRT2);
  t.deepEqual(result.path, [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]);
});

test("A* with octile heuristic finds diagonal-cost path", (t) => {
  const algo = new IterableAStar({
    start: { x: 0, y: 0 },
    end: { x: 2, y: 2 },
    canEnterTile: bounded(5, 5),
    getNeighbors: getDiagonalNeighbors,
    heuristic: octileDistance,
  });

  const result = runToCompletion(algo);

  t.is(result.type, Algo.ActionType.Found);
  t.is(result.cost, 2 * Math.SQRT2);
  t.deepEqual(result.path, [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]);
});

test("Dijkstra detours around a wall", (t) => {
  // 5×3 grid; row y=0 blocked by walls at x=1,2,3 — must go up and over.
  // Only optimal path is: up to row 1, across, then down at the right edge.
  const walls = new Set(["1,0", "2,0", "3,0"]);
  const algo = new IterableDijkstra({
    start: { x: 0, y: 0 },
    end: { x: 4, y: 0 },
    canEnterTile: bounded(5, 3, walls),
    getNeighbors: getManhattanNeighbors,
  });

  const result = runToCompletion(algo);

  t.is(result.type, Algo.ActionType.Found);
  t.is(result.cost, 6);
  t.deepEqual(result.path, [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 4, y: 0 },
  ]);
});

test("Dijkstra returns NoMas when end is unreachable", (t) => {
  // End at (4,4) in the top-right corner; its only in-grid neighbors (3,4)
  // and (4,3) are walls. End is therefore unreachable and never enqueued.
  const walls = new Set(["3,4", "4,3"]);
  const algo = new IterableDijkstra({
    start: { x: 0, y: 0 },
    end: { x: 4, y: 4 },
    canEnterTile: bounded(5, 5, walls),
    getNeighbors: getManhattanNeighbors,
  });

  const result = runToCompletion(algo);

  t.is(result.type, Algo.ActionType.NoMas);
});
