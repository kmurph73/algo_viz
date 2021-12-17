export class PriorityQueue {
    store;
    headId;
    length;
    constructor() {
        this.store = new Map();
        this.headId = null;
        this.length = 0;
    }
    enqueue(id, node) {
        if (!this.headId) {
            this.headId = id;
            this.store.set(id, { thing: node, nextId: null });
            this.length += 1;
            return;
        }
        const val = node.value;
        let tail = null;
        let tailId = null;
        let nextId = this.headId;
        while (nextId) {
            const next = this.getNode(nextId);
            if (next.thing.value <= val) {
                tail = next;
                nextId = next.nextId;
            }
            else {
                break;
            }
        }
        if (tail) {
            tail.nextId = id;
        }
        else {
            this.headId = id;
        }
        this.store.set(id, { thing: node, nextId });
        this.length += 1;
    }
    has(id) {
        return this.store.has(id);
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
    getFront() {
        return this.headId ? this.getNode(this.headId) : null;
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
        const arr = [
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
