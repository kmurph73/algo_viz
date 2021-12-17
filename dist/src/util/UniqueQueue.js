export class UniqueQueue {
    store;
    headId;
    tailId;
    length;
    constructor() {
        this.store = {};
        this.headId = null;
        this.tailId = null;
        this.length = 0;
    }
    enqueue(id, node) {
        const existing = this.store[id];
        if (existing) {
            return;
        }
        const tail = this.tailId ? this.store[this.tailId] : null;
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
    dequeue() {
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
    getNode(id) {
        const node = this.store[id];
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
