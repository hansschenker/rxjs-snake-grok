/**
 * Tick — the Feature 1 entity, as a value.
 *
 * Count and interval are both stored. A tick passing is a later transition.
 */

export type Tick = {
  readonly count: number;
  readonly interval: number;
};

export function tick(count: number, interval: number): Tick {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error("count must be an integer >= 0");
  }
  if (!Number.isInteger(interval) || interval < 1) {
    throw new Error("interval must be an integer >= 1");
  }
  return { count, interval };
}
