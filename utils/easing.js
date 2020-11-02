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
