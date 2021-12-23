/**
 * transform a value via callback
 *
 * @doctest
 * ```js
 * t.is(then(1, (n) => n + 1), 2)
 * ```
 */
export const then = <A, B>(a: A, cb: (a: A) => B): B => {
  return cb(a);
};

export const roundToOneDecimal = (num: number): number => {
  return Math.round(num * 10) / 10;
};

export const unwrap = <T>(
  value: T | undefined | null,
  errorMessage?: string
): T => {
  if (value == null) {
    throw new Error(
      errorMessage == null ? "Value should be here!" : errorMessage
    );
  } else {
    return value;
  }
};
