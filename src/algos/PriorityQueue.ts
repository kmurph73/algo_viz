type QueueNode<T> = {
  thing: T;
  nextId: string | null;
};

type Store<T> = Map<string, QueueNode<T>>;

export class PriorityQueue<T extends { value: number }> {
  store: Store<T>;
  headId: string | null;
  length: number;

  constructor() {
    this.store = new Map();
    this.headId = null;
    this.length = 0;
  }

  enqueue(id: string, node: T): void {
    if (!this.headId) {
      this.headId = id;
      this.store.set(id, { thing: node, nextId: null });
      this.length += 1;

      return;
    }

    const val = node.value;

    let tail: QueueNode<T> | null = null;
    let tailId = null;
    let nextId: string | null = this.headId;

    while (nextId) {
      const next = this.getNode(nextId);

      if (next.thing.value <= val) {
        tail = next;
        nextId = next.nextId;
      } else {
        break;
      }
    }

    if (tail) {
      tail.nextId = id;
    } else {
      this.headId = id;
    }

    this.store.set(id, { thing: node, nextId });

    this.length += 1;
  }

  has(id: string): boolean {
    return this.store.has(id);
  }

  dequeue(): T | null {
    if (!this.headId) {
      return null;
    }

    const front = this.store.get(this.headId);

    if (!front) {
      throw new Error("Front should be here...");
    }

    this.store.delete(this.headId);
    this.length -= 1;
    this.headId = front.nextId;

    return front.thing;
  }

  getFront(): QueueNode<T> | null {
    return this.headId ? this.getNode(this.headId) : null;
  }

  getNode(id: string): QueueNode<T> {
    const node = this.store.get(id);

    if (!node) {
      throw new Error(`node should be here for id ${id}`);
    }

    return node;
  }

  toArr(): { id: string; value: number }[] {
    if (!this.headId) {
      return [];
    }

    let node: QueueNode<T> | null = this.getNode(this.headId);

    const arr: { id: string; value: number }[] = [
      {
        id: this.headId,
        value: node.thing.value,
      },
    ];

    while (node && node.nextId) {
      const nextNode = this.getNode(node.nextId);

      arr.push({
        id: node.nextId,
        value: nextNode.thing.value,
      });

      node = nextNode;
    }

    return arr;
  }
}
