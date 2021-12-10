type QueueNode<T> = {
  thing: T;
  nextId: string | null;
};

type Store<T> = Record<string, QueueNode<T> | null>;

export class UniqueQueue<T> {
  store: Store<T>;
  headId: string | null;
  tailId: string | null;
  length: number;

  constructor() {
    this.store = {};
    this.headId = null;
    this.tailId = null;
    this.length = 0;
  }

  enqueue(id: string, node: T): void {
    const existing = this.store[id];
    if (existing) {
      return;
    }

    const tail = this.tailId ? this.store[this.tailId]! : null;

    if (tail) {
      tail.nextId = id;
    }

    this.store[id] = { thing: node, nextId: null };
    this.tailId = id;

    if (!this.headId) {
      this.headId = id;
    }

    this.length += 1;
  }

  dequeue(): T | null {
    if (!this.headId) {
      return null;
    }

    const front = this.store[this.headId];

    if (!front) {
      throw new Error("Front should be here...");
    }

    this.store[this.headId] = null;
    this.length -= 1;
    this.headId = front.nextId;

    return front.thing;
  }

  getNode(id: string): QueueNode<T> {
    const node = this.store[id];

    if (!node) {
      throw new Error(`node should be here for id ${id}`);
    }

    return node;
  }

  toArr(): T[] {
    if (!this.headId) {
      return [];
    }

    let node = this.getNode(this.headId);

    const arr: T[] = [node.thing];

    while (node.nextId) {
      node = this.getNode(node.nextId);
      arr.push(node.thing);
    }

    return arr;
  }
}
