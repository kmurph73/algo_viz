https://kmurph73.github.io/algo_viz/

I needed [Djikstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) & [A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) for a roguelike I started to make after going through [Hands-on Rust](https://pragprog.com/titles/hwrust/hands-on-rust/).

Decided to roll my own algos, which was great fun.

Why Djikstra's?  Checkout [The Incredible Power of Dijkstra Maps](http://www.roguebasin.com/index.php/The_Incredible_Power_of_Dijkstra_Maps) by [Brogue](<https://en.wikipedia.org/wiki/Brogue_(video_game)>)'s creator Brian Walker, for starters.

#### Dijkstra TL;DR

Unweighted, lazy version.

1. "Visit" the starting node.

2. Queue up the node's (passable) neighbors for later visit - storing the current node as `previous` for each.

3. Dequeue a node, then "visit" it. Go back to step 2 until you find the goal node, then retrace your steps via `previous` until you get to your start node. That's your path to the goal.

#### A\* TL;DR

[A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) is just a slightly tweaked Dijkstra. It utilizes a heuristic function to assign a "cost" to the current node's neighbors.

The heuristic function is: `g(n) + h(n)`

where `g(n)` is (confusingly) the distance to the start node, and `h(n)` is the distance to the goal node.

We utilize a priority queue to ensure that the lowest cost node is always dequeued first.

If we can only travel up/down/left/right ([Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)), the function for calculating the distance to the goal node (`h(n)`) is:

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
