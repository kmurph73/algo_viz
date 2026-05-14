import test from "ava";
import { PriorityQueue } from "../src/algos/PriorityQueue.js";
import { Queue } from "../src/algos/Queue.js";

test("Queue", (t) => {
  const q = new Queue<number>();
  q.enqueue("1", 1);
  q.enqueue("5", 5);
  q.enqueue("7", 7);

  t.deepEqual(q.toArr(), [1, 5, 7]);

  t.is(q.length, 3);
  const one = q.dequeue();

  t.is(one, 1);

  t.is(q.length, 2);
  t.deepEqual(q.toArr(), [5, 7]);
});

test("PriorityQueue", (t) => {
  const q = new PriorityQueue<{ value: number }>();
  q.enqueue("1,1", { value: 1 });
  q.enqueue("5,5", { value: 20 });
  q.enqueue("3,3", { value: 10 });
  q.enqueue("5,6", { value: 20 });

  const node = q.getFront()!;

  t.is(node.nextId, "3,3");

  t.deepEqual(q.toArr(), [
    { id: "1,1", value: 1 },
    { id: "3,3", value: 10 },
    { id: "5,5", value: 20 },
    { id: "5,6", value: 20 },
  ]);

  t.is(q.length, 4);
  const one = q.dequeue();

  t.deepEqual(one, { value: 1 });

  t.is(q.length, 3);
  q.dequeue();

  t.deepEqual(q.toArr(), [
    { id: "5,5", value: 20 },
    { id: "5,6", value: 20 },
  ]);
});

test("PriorityQueue: remove from head, middle, and tail", (t) => {
  const q = new PriorityQueue<{ value: number }>();
  q.enqueue("a", { value: 1 });
  q.enqueue("b", { value: 2 });
  q.enqueue("c", { value: 3 });
  q.enqueue("d", { value: 4 });
  q.enqueue("e", { value: 5 });

  q.remove("c");
  t.is(q.length, 4);
  t.deepEqual(q.toArr(), [
    { id: "a", value: 1 },
    { id: "b", value: 2 },
    { id: "d", value: 4 },
    { id: "e", value: 5 },
  ]);

  q.remove("a");
  t.is(q.length, 3);
  t.is(q.getFront()?.thing.value, 2);

  q.remove("e");
  t.is(q.length, 2);
  t.deepEqual(q.toArr(), [
    { id: "b", value: 2 },
    { id: "d", value: 4 },
  ]);

  q.remove("not-there");
  t.is(q.length, 2);

  q.remove("b");
  q.remove("d");
  t.is(q.length, 0);
  t.is(q.dequeue(), null);
  t.is(q.getFront(), null);
});
