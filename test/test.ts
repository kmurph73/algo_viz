import test from "ava";
import {
  ActionType,
  IterableLazyDijkstra,
} from "../src/algos/IterableLazyDijkstra.js";
import { getCardinalNeighbors } from "../src/app_util/appDjikstra.js";
import { state } from "../src/constants.js";

test("foo", (t) => {
  const start = { row: 0, col: 0 };
  const end = { row: 2, col: 2 };
  const diagonal = state.allowDiagonal;
  const grid = Array(10).fill(1);

  for (let index = 0; index < 10; index++) {
    grid[index] = Array(10).fill(1);
  }

  const canEnterTile = (row: number, col: number): boolean => {
    const r = grid[row];
    if (!r) {
      return false;
    }

    return r[col] != null;
  };

  const algo = new IterableLazyDijkstra({
    start,
    end,
    canEnterTile,
    getNeighbors: getCardinalNeighbors,
    diagonal,
  });

  let result = algo.next(); // 1

  t.is(result.type, ActionType.Enqueued);
  t.deepEqual(result.point, { row: 1, col: 0 });

  result = algo.next(); // 2

  t.is(result.type, ActionType.Enqueued);
  t.deepEqual(result.point, { row: 0, col: 1 });

  result = algo.next(); // 3

  t.is(result.type, ActionType.Visit);
  t.deepEqual(result.point, { row: 1, col: 0 });
  t.is(algo.neighborIndex, 0);

  result = algo.next(); // 4

  t.is(algo.neighborIndex, 1);
  t.is(result.type, ActionType.Enqueued);
  t.deepEqual(result.point, { row: 2, col: 0 });

  result = algo.next(); // 5

  t.is(algo.neighborIndex, 2);
  t.is(result.type, ActionType.Enqueued);
  t.deepEqual(result.point, { row: 1, col: 1 });

  result = algo.next(); // 6

  t.is(algo.neighborIndex, 0);
  t.is(result.type, ActionType.Visit);
  t.deepEqual(result.point, { row: 0, col: 1 });

  result = algo.next(); // 7

  t.is(algo.neighborIndex, 0);
  t.is(result.type, ActionType.Visit);
  t.deepEqual(result.point, { row: 0, col: 1 });
});
