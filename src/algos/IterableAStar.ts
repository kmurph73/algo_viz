type Point = { x: number; y: number };

/**
 * Calculate the Manhattan distance.
 */
const heuristic = (node1: Point, node2: Point) => {
  const dx = Math.abs(node1.x - node2.x);
  const dy = Math.abs(node1.y - node2.y);

  return dx + dy;
};
