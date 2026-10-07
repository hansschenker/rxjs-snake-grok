/**
 * Game — the Feature 1 entity, as a value.
 *
 * It holds the other entities. Feature 1 has no food, score, or collision,
 * so phase is running.
 */

import type { Board } from "./board.ts";
import type { Direction } from "./direction.ts";
import type { Keypress } from "./keypress.ts";
import type { Snake } from "./snake.ts";
import type { Tick } from "./tick.ts";

export type Phase = "running";

export type Game = {
  readonly phase: Phase;
  readonly snake: Snake;
  readonly board: Board;
  readonly direction: Direction;
  readonly lastKeypress: Keypress | null;
  readonly tick: Tick;
};

export function game(
  snake: Snake,
  board: Board,
  direction: Direction,
  tick: Tick,
  lastKeypress: Keypress | null = null,
): Game {
  return { phase: "running", snake, board, direction, lastKeypress, tick };
}
