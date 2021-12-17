export var Algo;
(function (Algo) {
    let ActionType;
    (function (ActionType) {
        ActionType[ActionType["Enqueued"] = 1] = "Enqueued";
        ActionType[ActionType["Visit"] = 2] = "Visit";
        ActionType[ActionType["Found"] = 3] = "Found";
        ActionType[ActionType["NoMas"] = 4] = "NoMas";
    })(ActionType = Algo.ActionType || (Algo.ActionType = {}));
})(Algo || (Algo = {}));
