/**
 * Snake — the Feature 1 entity, as a value.
 *
 * Segments are stored. Length, head, tail, and path are functions of them.
 */

import type { Cell } from "./board.ts";

export type Snake = {
  readonly segments: readonly Cell[];
};

export function snake(segments: readonly Cell[]): Snake {
  if (segments.length < 1) {
    throw new Error("snake must have at least one segment");
  }
  return { segments };
}

export function length(snake: Snake): number {
  return snake.segments.length;
}

export function head(snake: Snake): Cell {
  return snake.segments[0];
}

export function tail(snake: Snake): Cell {
  return snake.segments[snake.segments.length - 1];
}

/** The cells the body occupies, head first. */
export function path(snake: Snake): readonly Cell[] {
  return snake.segments;
}
