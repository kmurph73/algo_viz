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

#### Inspirations

* Clément Mihailescu's pathfinding visualizer: https://clementmihailescu.github.io/Pathfinding-Visualizer
* rot.js's Dijkstra & A* implementations: https://github.com/ondras/rot.js/tree/master/lib/path
* [Hands-on Rust](https://pragprog.com/titles/hwrust/hands-on-rust/) for starting me down this path!
