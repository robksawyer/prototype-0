/**
 * @file easing.js
 * Collection of easing functions for React Three Fiber animations.
 */

/**
 * easeInOutCubic
 * @param {*} t
 */
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

/**
 * linear
 * @param {*} y2
 * @param {*} y1
 * @param {*} x2
 * @param {*} x1
 * @param {*} currentVal
 */
export const linear = (y2, y1, x2, x1, currentVal) => {
  let m = (y2 - y1) / (x2 - x1)
  let b = y1 - m * x1
  return m * currentVal + b
}

/**
 * lerp
 * @param {*} a
 * @param {*} b
 * @param {*} n
 */
export const lerp = (a, b, n) => (1 - n) * a + n * b
