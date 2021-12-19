(() => {
  // dist/src/algos/algo_types.js
  var Algo;
  (function(Algo2) {
    let ActionType;
    (function(ActionType2) {
      ActionType2[ActionType2["Enqueued"] = 1] = "Enqueued";
      ActionType2[ActionType2["Visit"] = 2] = "Visit";
      ActionType2[ActionType2["Found"] = 3] = "Found";
      ActionType2[ActionType2["NoMas"] = 4] = "NoMas";
    })(ActionType = Algo2.ActionType || (Algo2.ActionType = {}));
  })(Algo || (Algo = {}));

  // dist/src/grid/Grid.js
  var TileType;
  (function(TileType2) {
    TileType2[TileType2["Empty"] = 1] = "Empty";
    TileType2[TileType2["Wall"] = 2] = "Wall";
    TileType2[TileType2["Gutter"] = 3] = "Gutter";
    TileType2[TileType2["Start"] = 4] = "Start";
    TileType2[TileType2["End"] = 5] = "End";
  })(TileType || (TileType = {}));
  var tileTexts = {
    [TileType.Empty]: "",
    [TileType.Start]: "@",
    [TileType.Wall]: "#",
    [TileType.End]: "$",
    [TileType.Gutter]: "nada"
  };
  var Grid = class {
    tiles;
    startPoint;
    endPoint;
    constructor(start, end) {
      this.tiles = [];
      this.startPoint = start;
      this.endPoint = end;
    }
    startTile() {
      return this.atPoint(this.startPoint);
    }
    endTile() {
      return this.atPoint(this.endPoint);
    }
    at(x, y) {
      const rowArray = this.tiles[y];
      if (!rowArray) {
        return null;
      }
      return rowArray[x] || null;
    }
    tdAt(x, y) {
      const td = this.at(x, y)?.td;
      if (!td) {
        throw new Error(`td should be naw: ${x},${y}`);
      }
      return td;
    }
    atPoint({ x, y }) {
      return this.at(x, y);
    }
    saveToLocalStorage() {
      const json = {
        walls: [],
        start: this.startPoint,
        end: this.endPoint
      };
      for (let index = 0; index <= NumRows; index++) {
        const row = this.tiles[index];
        for (let index2 = 0; index2 <= NumColumns; index2++) {
          const tile = row[index2];
          if (tile.type === TileType.Empty) {
            const { x, y } = tile.point;
            json.walls.push([x, y]);
          }
        }
      }
      localStorage.setItem("grid", JSON.stringify(json));
    }
  };

  // dist/src/constants.js
  var NumRows = 16;
  var NumColumns = 24;
  var defaultStartPoint = { x: 1, y: 8 };
  var defaultEndpoint = { x: 12, y: 8 };
  var grid = new Grid(defaultStartPoint, defaultEndpoint);
  var html = {
    go: null,
    tick: null,
    reset: null,
    speed: null,
    algo: null,
    diagonal: null
  };
  var state = {
    dragging: false,
    currentType: TileType.Wall,
    diagonal: false,
    speed: "medium",
    algo: "Djikstra"
  };
  var searchIsDone = () => {
    if (state.tickType == null) {
      return false;
    }
    return state.tickType === Algo.ActionType.Found || state.tickType === Algo.ActionType.NoMas;
  };

  // dist/src/state_changes/algo.js
  var changeAlgo = (e) => {
    const select = e.target;
    const algo = select.value;
    state.algo = algo;
  };

  // dist/src/algos/algo_util.js
  var getPath = (lastNode) => {
    const path = [lastNode.point];
    let prev = lastNode.prev;
    while (prev != null) {
      path.push(prev.point);
      prev = prev.prev;
    }
    return path.reverse();
  };
  var manhattanDistance = (node1, node2) => {
    const dx = Math.abs(node1.x - node2.x);
    const dy = Math.abs(node1.y - node2.y);
    return dx + dy;
  };
  var euclideanDistance = (p1, p2) => {
    let y = p2.x - p1.x;
    let x = p2.y - p1.y;
    return Math.sqrt(x * x + y * y);
  };

  // dist/src/structs/point.js
  var pointsEq = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
  };
  var addPoints = (p1, p2) => {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
  };

  // dist/src/app_util/app_util.js
  var manhattanNeighbors = [
    ["north", { x: 0, y: 1 }],
    ["east", { x: 1, y: 0 }],
    ["south", { x: 0, y: -1 }],
    ["west", { x: -1, y: 0 }]
  ];
  var allNeighbors = [
    ["north", { x: 0, y: 1 }],
    ["east", { x: 1, y: 0 }],
    ["south", { x: 0, y: -1 }],
    ["west", { x: -1, y: 0 }],
    ["northEast", { x: 1, y: 1 }],
    ["southEast", { x: 1, y: -1 }],
    ["southWest", { x: -1, y: -1 }],
    ["northWest", { x: -1, y: 1 }]
  ];
  var getNeighbors = (x, y, diagonal) => {
    const points = [];
    const directions = diagonal ? allNeighbors : manhattanNeighbors;
    for (let index = 0; index < directions.length; index++) {
      const point = directions[index][1];
      const nextPoint = addPoints(point, { x, y });
      points.push(nextPoint);
    }
    return points;
  };
  var getDiagonalNeighbors = (x, y) => {
    return getNeighbors(x, y, true);
  };
  var getManhattanNeighbors = (x, y) => {
    return getNeighbors(x, y, false);
  };
  var canEnterTile = (x, y) => {
    const tile = grid.at(x, y);
    return tile != null && tile.type === TileType.Empty;
  };
  var walkToDest = (path) => {
    let steps = 0;
    const len = path.length - 1;
    const walk = setInterval(() => {
      if (steps <= len) {
        const point = path[steps];
        const tile = grid.atPoint(point);
        tile.td.classList.add("yellow-brick");
        steps += 1;
      } else {
        window.clearInterval(walk);
      }
    }, 30);
  };

  // dist/src/state_changes/diagonal.js
  var changeDiagonal = (e) => {
    const checkbox = e.target;
    state.diagonal = checkbox.checked;
    if (state.currentAlgo) {
      state.currentAlgo.getNeighbors = state.diagonal ? getDiagonalNeighbors : getManhattanNeighbors;
      if (!state.currentAlgo.isDijkstra()) {
        state.currentAlgo.heuristic = state.diagonal ? euclideanDistance : manhattanDistance;
      }
    }
  };

  // dist/src/app_util/html_util.js
  var setDisabled = (elements, disabled) => {
    for (let index = 0; index < elements.length; index++) {
      const element = html[elements[index]];
      element.disabled = disabled;
    }
  };

  // dist/src/algos/PriorityQueue.js
  var PriorityQueue = class {
    store;
    headId;
    length;
    constructor() {
      this.store = /* @__PURE__ */ new Map();
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
          value: node.thing.value
        }
      ];
      while (node && node.nextId) {
        const nextNode = this.getNode(node.nextId);
        arr.push({
          id: node.nextId,
          value: nextNode.thing.value
        });
        node = nextNode;
      }
      return arr;
    }
  };

  // dist/src/algos/IterableAStar.js
  var IterableAStar = class {
    visited;
    awaitingVisit;
    start;
    end;
    totalTicks;
    canEnterTile;
    getNeighbors;
    heuristic;
    currentNode;
    neighborIndex;
    currentNeighbors;
    currentNeighborsLength;
    constructor({ start, end, canEnterTile: canEnterTile2, getNeighbors: getNeighbors2, heuristic }) {
      this.visited = {};
      this.awaitingVisit = new PriorityQueue();
      this.heuristic = heuristic;
      this.start = start;
      this.end = end;
      this.totalTicks = 0;
      this.neighborIndex = 0;
      this.currentNode = {
        point: start,
        prev: null,
        value: 0,
        g: 0,
        h: 0
      };
      this.currentNeighbors = getNeighbors2(start.x, start.y);
      this.currentNeighborsLength = this.currentNeighbors.length;
      this.canEnterTile = canEnterTile2;
      this.getNeighbors = getNeighbors2;
    }
    visitNext() {
      const { x, y } = this.currentNode.point;
      this.visited[`${x},${y}`] = this.currentNode;
      const nextNode = this.awaitingVisit.dequeue();
      if (nextNode) {
        const nextPoint = nextNode.point;
        this.currentNode = nextNode;
        this.currentNeighbors = this.getNeighbors(nextPoint.x, nextPoint.y);
        this.currentNeighborsLength = this.currentNeighbors.length;
        this.neighborIndex = 0;
        return { point: nextPoint, type: Algo.ActionType.Visit };
      } else {
        return { point: this.currentNode.point, type: Algo.ActionType.NoMas };
      }
    }
    next() {
      this.totalTicks += 1;
      while (this.neighborIndex < this.currentNeighborsLength) {
        const point = this.currentNeighbors[this.neighborIndex];
        if (pointsEq(point, this.end)) {
          const node = {
            point,
            prev: this.currentNode,
            value: this.currentNode.value + 1
          };
          const path = getPath(node);
          return { point, type: Algo.ActionType.Found, path };
        }
        const { x, y } = point;
        this.neighborIndex += 1;
        const id = `${x},${y}`;
        const visited = this.visited[id] != null;
        const queued = this.awaitingVisit.has(id);
        if (visited || queued) {
          continue;
        }
        if (this.canEnterTile(x, y)) {
          const prev = this.currentNode;
          const g = prev.g + 1;
          const h = this.heuristic(point, this.end);
          const node = {
            point,
            prev: this.currentNode,
            g,
            h,
            value: g + h
          };
          this.awaitingVisit.enqueue(`${x},${y}`, node);
          return { point, type: Algo.ActionType.Enqueued };
        }
      }
      return this.visitNext();
    }
    isDijkstra() {
      return false;
    }
  };

  // dist/src/app_util/initAStar.js
  var initAStar = () => {
    const start = grid.startPoint;
    const end = grid.endPoint;
    const diagonal = state.diagonal;
    return new IterableAStar({
      start,
      end,
      canEnterTile,
      getNeighbors: diagonal ? getDiagonalNeighbors : getManhattanNeighbors,
      heuristic: diagonal ? euclideanDistance : manhattanDistance
    });
  };

  // dist/src/algos/Queue.js
  var Queue = class {
    store;
    headId;
    tailId;
    length;
    constructor() {
      this.store = /* @__PURE__ */ new Map();
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
  };

  // dist/src/algos/IterableLazyDijkstra.js
  var IterableLazyDijkstra = class {
    visited;
    awaitingVisit;
    start;
    end;
    totalTicks;
    canEnterTile;
    getNeighbors;
    currentNode;
    neighborIndex;
    currentNeighbors;
    currentNeighborsLength;
    constructor({ start, end, canEnterTile: canEnterTile2, getNeighbors: getNeighbors2 }) {
      this.visited = {};
      this.awaitingVisit = new Queue();
      this.start = start;
      this.end = end;
      this.totalTicks = 0;
      this.neighborIndex = 0;
      this.currentNode = {
        point: start,
        prev: null,
        value: 0
      };
      this.currentNeighbors = getNeighbors2(start.x, start.y);
      this.currentNeighborsLength = this.currentNeighbors.length;
      this.canEnterTile = canEnterTile2;
      this.getNeighbors = getNeighbors2;
    }
    visitNext() {
      const { x, y } = this.currentNode.point;
      this.visited[`${x},${y}`] = this.currentNode;
      const nextNode = this.awaitingVisit.dequeue();
      if (nextNode) {
        const nextPoint = nextNode.point;
        this.currentNode = nextNode;
        this.currentNeighbors = this.getNeighbors(nextPoint.x, nextPoint.y);
        this.currentNeighborsLength = this.currentNeighbors.length;
        this.neighborIndex = 0;
        return { point: nextPoint, type: Algo.ActionType.Visit };
      } else {
        return { point: this.currentNode.point, type: Algo.ActionType.NoMas };
      }
    }
    next() {
      this.totalTicks += 1;
      while (this.neighborIndex < this.currentNeighborsLength) {
        const point = this.currentNeighbors[this.neighborIndex];
        if (pointsEq(point, this.end)) {
          const node = {
            point,
            prev: this.currentNode,
            value: this.currentNode.value + 1
          };
          const path = getPath(node);
          return { point, type: Algo.ActionType.Found, path };
        }
        const { x, y } = point;
        this.neighborIndex += 1;
        const id = `${x},${y}`;
        const visited = this.visited[id];
        if (visited || this.awaitingVisit.has(id)) {
          continue;
        }
        if (this.canEnterTile(x, y)) {
          const node = {
            point,
            prev: this.currentNode,
            value: this.currentNode.value + 1
          };
          this.awaitingVisit.enqueue(id, node);
          return { point, type: Algo.ActionType.Enqueued };
        }
      }
      return this.visitNext();
    }
    isDijkstra() {
      return true;
    }
  };

  // dist/src/app_util/initDjikstra.js
  var initDijkstra = () => {
    const start = grid.startPoint;
    const end = grid.endPoint;
    const diagonal = state.diagonal;
    return new IterableLazyDijkstra({
      start,
      end,
      canEnterTile,
      getNeighbors: diagonal ? getDiagonalNeighbors : getManhattanNeighbors
    });
  };

  // dist/src/grid/clearGrid.js
  var clearGrid = ({ keepWalls }) => {
    state.currentVisitedTile = void 0;
    setDisabled(["diagonal", "algo"], false);
    for (let y = 0; y <= NumRows; y++) {
      for (let x = 0; x <= NumColumns; x++) {
        const tile = grid.at(x, y);
        if (tile.type === TileType.Gutter) {
          continue;
        }
        tile.td.classList.remove("visited", "queued", "currentnode", "yellow-brick");
        const type = (() => {
          if (pointsEq(tile.point, grid.startPoint)) {
            return TileType.Start;
          } else if (pointsEq(tile.point, grid.endPoint)) {
            return TileType.End;
          } else if (tile.type === TileType.Wall && keepWalls) {
            return TileType.Wall;
          } else {
            return TileType.Empty;
          }
        })();
        tile.type = type;
        tile.td.innerText = tileTexts[type];
      }
    }
  };

  // dist/src/state_changes/clear.js
  var handleClear = ({ keepWalls }) => {
    clearGrid({ keepWalls });
    state.currentAlgo = void 0;
    state.tickType = void 0;
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = void 0;
    }
    html.go.disabled = false;
    html.go.innerText = "go";
  };

  // dist/src/state_changes/speed.js
  var changeSpeed = (e) => {
    const select = e.target;
    const speed = select.value;
    state.speed = speed;
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = void 0;
      startLooping(state.currentAlgo);
    }
  };
  var getSpeed = () => {
    switch (state.speed) {
      case "slow":
        return 60;
      case "medium":
        return 30;
      case "fast":
        return 10;
    }
  };

  // dist/src/state_changes/tick.js
  var clickTick = () => {
    if (searchIsDone()) {
      handleClear({ keepWalls: true });
      clickTick();
      return;
    }
    if (!state.currentAlgo) {
      state.currentAlgo = state.algo === "A*" ? initAStar() : initDijkstra();
    }
    const algo = state.currentAlgo;
    const next = algo.next();
    const tile = grid.atPoint(next.point);
    handleTick(tile, next);
  };
  var handleTick = (tile, next) => {
    const classList = tile.td.classList;
    state.tickType = next.type;
    const { Found, Visit, NoMas } = Algo.ActionType;
    const donesky = Found === next.type || next.type === NoMas;
    if (donesky) {
      if (state.currentLoop) {
        clearInterval(state.currentLoop);
        state.currentLoop = void 0;
      }
      const path = next.path;
      if (!path && next.type === Found) {
        throw new Error("end node found, path should be here");
      } else if (path) {
        walkToDest(path);
      }
      setDisabled(["go", "tick", "reset", "diagonal", "algo"], false);
      html.go.innerText = "go";
      return;
    }
    if (next.type === Visit) {
      classList.remove("queued");
      classList.add("currentnode");
      if (state.currentVisitedTile) {
        const cl = state.currentVisitedTile.td.classList;
        cl.remove("currentnode");
        cl.add("visited");
      }
      state.currentVisitedTile = tile;
    } else {
      classList.add("queued");
    }
  };

  // dist/src/state_changes/go.js
  var clickGoButton = () => {
    const goButton = html.go;
    const done = state.tickType === Algo.ActionType.NoMas || state.tickType === Algo.ActionType.Found;
    if (done) {
      handleClear({ keepWalls: true });
      clickGoButton();
    } else if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = void 0;
      setDisabled(["reset", "tick", "diagonal", "algo"], false);
      goButton.innerText = "go";
    } else if (state.currentAlgo) {
      goButton.innerText = "stop";
      startLooping(state.currentAlgo);
    } else {
      goButton.innerText = "stop";
      state.algo === "A*" ? startAStar() : startDijkstra();
    }
  };
  var startLooping = (algo) => {
    const speed = getSpeed();
    setDisabled(["tick", "reset", "algo", "diagonal"], true);
    const loop = window.setInterval(() => {
      const next = algo.next();
      const tile = grid.atPoint(next.point);
      handleTick(tile, next);
    }, speed);
    state.currentLoop = loop;
  };
  var startDijkstra = () => {
    const algo = initDijkstra();
    state.currentAlgo = algo;
    startLooping(algo);
  };
  var startAStar = () => {
    const algo = initAStar();
    state.currentAlgo = algo;
    startLooping(algo);
  };

  // dist/src/grid/resetGrid.js
  var resetGrid = () => {
    grid.startPoint = defaultStartPoint;
    grid.endPoint = defaultEndpoint;
    state.currentVisitedTile = void 0;
    for (let y = 0; y <= NumRows; y++) {
      for (let x = 0; x <= NumColumns; x++) {
        const tile = grid.at(x, y);
        if (tile.type === TileType.Gutter) {
          continue;
        }
        tile.td.classList.remove("visited", "queued", "currentnode", "yellow-brick");
        const type = (() => {
          if (pointsEq(tile.point, defaultStartPoint)) {
            return TileType.Start;
          } else if (pointsEq(tile.point, defaultEndpoint)) {
            return TileType.End;
          } else {
            return TileType.Empty;
          }
        })();
        tile.type = type;
        tile.td.innerText = tileTexts[type];
      }
    }
  };

  // dist/src/state_changes/reset.js
  var clickReset = () => {
    resetGrid();
    state.currentAlgo = void 0;
    state.tickType = void 0;
    if (state.currentLoop) {
      clearInterval(state.currentLoop);
      state.currentLoop = void 0;
    }
    html.go.innerText = "go";
    html.go.disabled = false;
  };

  // dist/src/util/util.js
  var unwrap = (value, errorMessage) => {
    if (value == null) {
      throw new Error(errorMessage == null ? "Value should be here!" : errorMessage);
    } else {
      return value;
    }
  };

  // dist/src/events/handleEvents.js
  var assignHTMLElements = () => {
    html.go = unwrap(document.getElementById("go"));
    html.tick = unwrap(document.getElementById("tick"));
    html.reset = unwrap(document.getElementById("reset"));
    html.speed = unwrap(document.getElementById("speed_select"));
    html.algo = unwrap(document.getElementById("algo_select"));
    html.diagonal = unwrap(document.getElementById("diagonal"));
  };
  var attachEvents = () => {
    html.go.addEventListener("click", clickGoButton);
    html.tick.addEventListener("click", clickTick);
    html.reset.addEventListener("click", clickReset);
    html.speed.addEventListener("change", changeSpeed);
    html.algo.addEventListener("change", changeAlgo);
    html.diagonal.addEventListener("change", changeDiagonal);
  };

  // dist/src/events/mouse.js
  var isHtml = (ele) => {
    return ele.classList != null;
  };
  var findValidClickedOnTile = (event) => {
    const path = event.composedPath();
    const td = path.find((ele) => isHtml(ele) ? ele.classList.contains("tile") : false);
    if (td && !td.classList.contains("gutter")) {
      const y = parseInt(td.dataset.y);
      const x = parseInt(td.dataset.x);
      const tile = grid.at(x, y);
      if (!tile) {
        throw new Error(`tile ${x},${y} should be here`);
      }
      return tile;
    }
  };
  var moveNode = (origin, dest) => {
    const char = origin.type === TileType.Start ? "@" : "$";
    state.currentType = null;
    dest.td.innerText = char;
    dest.type = origin.type;
    const algo = state.currentAlgo;
    if (origin.type === TileType.Start) {
      grid.startPoint = dest.point;
      if (algo) {
        algo.start = dest.point;
      }
    } else {
      grid.endPoint = dest.point;
      if (algo) {
        algo.end = dest.point;
      }
    }
    origin.td.classList.remove("selected");
    origin.td.innerText = "";
    origin.type = TileType.Empty;
  };
  var mousedown = (event) => {
    const tile = findValidClickedOnTile(event);
    if (tile) {
      state.dragging = false;
      switch (tile.type) {
        case TileType.Start:
          if (state.currentType === TileType.End) {
            return;
          } else if (state.currentType === TileType.Start) {
            state.currentType = null;
            tile.td.classList.remove("selected");
            return;
          }
          state.currentType = TileType.Start;
          tile.td.classList.add("selected");
          break;
        case TileType.Empty:
          if (state.currentType === TileType.Start) {
            moveNode(grid.startTile(), tile);
          } else if (state.currentType === TileType.End) {
            moveNode(grid.endTile(), tile);
          } else {
            state.dragging = true;
            state.currentType = TileType.Wall;
            tile.type = TileType.Wall;
            tile.td.innerText = "#";
          }
          break;
        case TileType.Wall:
          if (state.currentType === TileType.Start) {
            moveNode(grid.startTile(), tile);
          } else if (state.currentType === TileType.End) {
            moveNode(grid.endTile(), tile);
          } else {
            state.dragging = true;
            state.currentType = TileType.Empty;
            tile.type = TileType.Empty;
            tile.td.innerText = "";
          }
          break;
        case TileType.End:
          if (state.currentType === TileType.Start) {
            return;
          } else if (state.currentType === TileType.End) {
            state.currentType = null;
            tile.td.classList.remove("selected");
          }
          state.currentType = TileType.End;
          tile.td.classList.add("selected");
          break;
        default:
          break;
      }
    }
    return false;
  };
  var mouseup = (event) => {
    state.dragging = false;
    const tile = findValidClickedOnTile(event);
    if (tile) {
      switch (tile.type) {
        case TileType.Empty:
          if (state.currentType === TileType.Start) {
            moveNode(grid.startTile(), tile);
          } else if (state.currentType === TileType.End) {
            moveNode(grid.endTile(), tile);
          }
          break;
        case TileType.Wall:
          if (state.currentType === TileType.Start) {
            moveNode(grid.startTile(), tile);
          } else if (state.currentType === TileType.End) {
            moveNode(grid.endTile(), tile);
          }
          break;
      }
    } else {
      state.currentType === TileType.Wall;
    }
  };
  var dragTypes = [TileType.Wall, TileType.Empty];
  var mousemove = (event) => {
    if (!state.currentType) {
      return;
    }
    if (state.dragging) {
      const tile = findValidClickedOnTile(event);
      if (tile) {
        const type = tile.type;
        if (tile && dragTypes.includes(type)) {
          const div = tile.td;
          div.innerText = tileTexts[state.currentType];
          tile.type = state.currentType;
        }
      }
    }
  };

  // dist/src/grid/attachGrid.js
  var attachGrid = () => {
    const container = document.getElementById("grid_container");
    if (!container) {
      throw new Error("couldn't find grid container div!");
    }
    const trs = [...container.querySelectorAll("table > tbody > tr")];
    trs.reverse();
    for (let y = 0; y < trs.length; y++) {
      const tr = trs[y];
      const tds = tr.children;
      const tiles = [];
      for (let x = 0; x < tds.length; x++) {
        const td = tds[x];
        td.dataset.y = y.toString();
        td.dataset.x = x.toString();
        const type = td.classList.contains("gutter") ? TileType.Gutter : TileType.Empty;
        const tile = {
          td,
          point: { x, y },
          type
        };
        tiles.push(tile);
      }
      grid.tiles.push(tiles);
    }
  };

  // dist/src/grid/drawGrid.js
  var drawGrid = () => {
    let html2 = "<table class='grid'><tbody>";
    let rowCount = 0;
    let colCount = 0;
    while (rowCount <= NumRows) {
      html2 += `<tr>`;
      while (colCount <= NumColumns) {
        const className = `${colCount === 0 || NumRows === rowCount ? "gutter" : "tile"}`;
        html2 += `<td class="${className}"></td>`;
        colCount += 1;
      }
      html2 += "</tr>";
      rowCount += 1;
      colCount = 0;
    }
    html2 += "</tbody></table>";
    document.getElementById("grid_container").innerHTML = html2;
  };
  var drawGutterNumbers = () => {
    for (let y = 0; y <= NumRows; y++) {
      for (let x = 0; x <= NumColumns; x++) {
        if (y === 0) {
          const div = grid.at(x, y).td;
          div.innerText = x.toString();
        }
        if (x === 0) {
          const tile = grid.at(x, y);
          tile.td.innerText = y.toString();
        }
      }
    }
  };
  var drawNodes = () => {
    const startTile = grid.atPoint(grid.startPoint);
    const endTile = grid.atPoint(grid.endPoint);
    startTile.td.innerText = "@";
    startTile.type = TileType.Start;
    endTile.td.innerText = "$";
    endTile.type = TileType.End;
  };

  // dist/src/main.js
  var main = () => {
    drawGrid();
    attachGrid();
    drawGutterNumbers();
    drawNodes();
    assignHTMLElements();
    attachEvents();
    document.body.addEventListener("mousedown", mousedown);
    document.body.addEventListener("mouseup", mouseup);
    document.body.addEventListener("mousemove", mousemove);
  };
  window.main = main;
  window.App = { state, grid };
})();
