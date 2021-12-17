/**
 * transform a value via callback
 *
 * @doctest
 * ```js
 * t.is(then(1, (n) => n + 1), 2)
 * ```
 */
export const then = (a, cb) => {
    return cb(a);
};
export const unwrap = (value, errorMessage) => {
    if (value == null) {
        throw new Error(errorMessage == null ? "Value should be here!" : errorMessage);
    }
    else {
        return value;
    }
};
