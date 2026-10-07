/**
 * What the board shows. The only text is the last accepted or rejected
 * arrow key, written in the top-left cell. Every other cell is empty.
 */

import type { Board } from "./board.ts";
import type { Game } from "./game.ts";

export type CellText = "left" | "right" | "up" | "down" | "";

export function directionText(game: Game): CellText {
  const key = game.lastKeypress?.key;
  if (key === "Left") return "left";
  if (key === "Right") return "right";
  if (key === "Up") return "up";
  if (key === "Down") return "down";
  return "";
}

/** Row-major grid. Index [0][0] is the top-left cell. */
export function boardText(game: Game, board: Board): readonly (readonly CellText[])[] {
  const label = directionText(game);
  return Array.from({ length: board.height }, (_, y) =>
    Array.from({ length: board.width }, (_, x) => (x === 0 && y === 0 ? label : "")),
  );
}
