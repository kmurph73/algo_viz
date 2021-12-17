import test from "ava";
import { Algo } from "../src/algos/algo_types.js";
import { IterableLazyDijkstra } from "../src/algos/IterableLazyDijkstra.js";
import { getManhattanNeighbors } from "../src/app_util/app_util.js";
test("short path", (t) => {
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 2 };
    const grid = Array(10).fill(1);
    for (let index = 0; index < 10; index++) {
        grid[index] = Array(10).fill(1);
    }
    const canEnterTile = (x, y) => {
        const r = grid[y];
        if (!r) {
            return false;
        }
        return r[x] != null;
    };
    const algo = new IterableLazyDijkstra({
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
    t.is(algo.totalTicks, 19); // 19
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
    const canEnterTile = (y, x) => {
        return false;
    };
    const algo = new IterableLazyDijkstra({
        start,
        end,
        canEnterTile,
        getNeighbors: getManhattanNeighbors,
    });
    let result = algo.next();
    t.is(result.type, Algo.ActionType.NoMas);
});
