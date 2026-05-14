An algo visualizer: https://kmurph73.github.io/algo_viz/

I needed [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) & [A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) for a roguelike I started to make after going through [Hands-on Rust](https://pragprog.com/titles/hwrust/hands-on-rust/).

Decided to roll my own algos, which was great fun.

Why Dijkstra's?  Checkout [The Incredible Power of Dijkstra Maps](http://www.roguebasin.com/index.php/The_Incredible_Power_of_Dijkstra_Maps) by [Brogue](<https://en.wikipedia.org/wiki/Brogue_(video_game)>)'s creator Brian Walker, for starters.

#### Dijkstra TL;DR

Lazy version. Edges are weighted: orthogonal steps cost `1`, diagonal steps cost `√2`.

1. "Visit" the starting node.

2. For each passable neighbor, enqueue it in a priority queue keyed on cumulative cost from the start - storing the current node as `previous`. If the neighbor is already queued with a higher cost, replace it.

3. Dequeue the lowest-cost node, then "visit" it. Go back to step 2 until you find the goal node, then retrace your steps via `previous` until you get to your start node. That's your path to the goal.

#### A\* TL;DR

[A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) is just a slightly tweaked Dijkstra. It uses a heuristic to bias the search toward the goal.

The cost function is: `f(n) = g(n) + h(n)`

where `g(n)` is the distance from the start node (same as Dijkstra), and `h(n)` is the heuristic estimate of the distance to the goal node.

We utilize a priority queue (keyed on `f(n)`) to ensure that the lowest cost node is always dequeued first.

If we can only travel up/down/left/right, `h(n)` is the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry):

```TypeScript
export const manhattanDistance = (node1: Point, node2: Point) => {
  const dx = Math.abs(node1.x - node2.x);
  const dy = Math.abs(node1.y - node2.y);

  return dx + dy;
};
```

If diagonal movement is allowed, `h(n)` is the octile distance — the exact cost of an unobstructed path that takes as many diagonal steps (cost `√2`) as possible before finishing with orthogonal steps (cost `1`):

```TypeScript
const SQRT2_MINUS_1 = Math.SQRT2 - 1;

export const octileDistance = (p1: Point, p2: Point) => {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);

  return Math.max(dx, dy) + SQRT2_MINUS_1 * Math.min(dx, dy);
};
```

Why this formula? The cheapest *unobstructed* path takes `min(dx, dy)` diagonal steps to line up one axis, then `|dx − dy|` orthogonal steps to finish:

```
min(dx,dy)·√2 + (max(dx,dy) − min(dx,dy))·1
= max(dx,dy) + (√2 − 1)·min(dx,dy)
```

Since obstacles can only make the real path longer, `h(n)` never overestimates — so it's admissible (A\* finds optimal paths) and consistent (no re-opening of closed nodes). It's also the *tightest* admissible heuristic for these step costs, so A\* expands the fewest nodes possible while staying optimal.

The pairing matters: using Manhattan with diagonals enabled would overestimate (it counts `dx + dy` when you can cut the corner), breaking admissibility. Euclidean would stay admissible but loosely underestimate, making A\* expand more nodes than necessary.

#### Inspirations

* Clément Mihailescu's pathfinding visualizer: https://clementmihailescu.github.io/Pathfinding-Visualizer
* rot.js's Dijkstra & A* implementations: https://github.com/ondras/rot.js/tree/master/lib/path
* [Hands-on Rust](https://pragprog.com/titles/hwrust/hands-on-rust/) for starting me down this path!
