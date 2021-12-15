export type Point = { x: number; y: number };

export const pointsEq = (p1: Point, p2: Point): boolean => {
  return p1.x === p2.x && p1.y === p2.y;
};

export const addPoints = (p1: Point, p2: Point): Point => {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};
