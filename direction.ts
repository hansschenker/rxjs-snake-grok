/**
 * Direction — the Feature 1 entity, as a value.
 *
 * Facing and pending are stored. Effective is pending if set, otherwise facing.
 */

export type Way = "Right" | "Left" | "Up" | "Down";

export type Direction = {
  readonly facing: Way;
  readonly pending: Way | null;
};

export const opposite: Record<Way, Way> = {
  Right: "Left",
  Left: "Right",
  Up: "Down",
  Down: "Up",
};

export function direction(facing: Way, pending: Way | null = null): Direction {
  return { facing, pending };
}

export function effective(direction: Direction): Way {
  return direction.pending ?? direction.facing;
}
