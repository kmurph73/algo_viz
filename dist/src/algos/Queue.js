export class Queue {
    store;
    headId;
    tailId;
    length;
    constructor() {
        this.store = new Map();
        this.headId = null;
        this.tailId = null;
        this.length = 0;
    }
    enqueue(id, node) {
        const tail = this.tailId ? this.getNode(this.tailId) : null;
        if (tail) {
            tail.nextId = id;
        }
        this.store.set(id, { thing: node, nextId: null });
        this.tailId = id;
        if (!this.headId) {
            this.headId = id;
        }
        this.length += 1;
    }
    dequeue() {
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
    has(id) {
        return this.store.has(id);
    }
    getNode(id) {
        const node = this.store.get(id);
        if (!node) {
            throw new Error(`node should be here for id ${id}`);
        }
        return node;
    }
    toArr() {
        if (!this.headId) {
            return [];
        }
        let node = this.getNode(this.headId);
        const arr = [node.thing];
        while (node.nextId) {
            node = this.getNode(node.nextId);
            arr.push(node.thing);
        }
        return arr;
    }
}
