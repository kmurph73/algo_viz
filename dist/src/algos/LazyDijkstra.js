import { UniqueQueue } from "./UniqueQueue";
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["Enqueued"] = 1] = "Enqueued";
    ActionType[ActionType["Visit"] = 2] = "Visit";
    ActionType[ActionType["Finished"] = 3] = "Finished";
})(ActionType || (ActionType = {}));
export class LazyDijkstra {
    visited;
    awaitingVisit;
    start;
    end;
    canEnterTile;
    getNeighbors;
    diagonal;
    currentNode;
    neighborIndex;
    currentNeighbors;
    constructor(props) {
        this.visited = {};
        this.awaitingVisit = new UniqueQueue();
        const { start, end, canEnterTile, getNeighbors, diagonal } = props;
        this.start = start;
        this.end = end;
        this.neighborIndex = 0;
        this.currentNode = {
            point: start,
            prev: null,
            value: 0,
        };
        this.currentNeighbors = getNeighbors(start.row, start.col);
        this.canEnterTile = canEnterTile;
        this.getNeighbors = getNeighbors;
        this.diagonal = diagonal;
    }
    next() {
        if (this.neighborIndex < this.currentNeighbors.length) {
            const point = this.currentNeighbors[this.neighborIndex];
            if (this.canEnterTile(point.row, point.col)) {
                this.awaitingVisit.enqueue(`${point.row},${point.col}`, point);
            }
            this.neighborIndex++;
            return { point, type: ActionType.Enqueued };
        }
        else {
            const { row, col } = this.currentNode.point;
            this.visited[`${row},${col}`];
            const nextPoint = this.awaitingVisit.dequeue();
            if (nextPoint) {
                const nextNode = {
                    point: nextPoint,
                    prev: this.currentNode,
                    value: this.currentNode.value + 1,
                };
            }
            else {
                return { point: this.currentNode.point, type: ActionType.Finished };
            }
        }
    }
}
