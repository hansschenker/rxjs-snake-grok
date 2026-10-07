/**
 * Feature 1 keypresses, displayed.
 *
 * Arrow keys enter through arrowKeys. press records the key and does not
 * move the snake. The subscription paints the resulting grid; the top-left
 * cell is the only one with text.
 */

import { scan, startWith, tap } from "rxjs";
import { board as makeBoard } from "./board.ts";
import { boardText } from "./display.ts";
import { direction } from "./direction.ts";
import { game as makeGame } from "./game.ts";
import { arrowKeys } from "./keys.ts";
import { press } from "./feature1.ts";
import { snake } from "./snake.ts";
import { tick } from "./tick.ts";

const root = document.querySelector<HTMLElement>("#board");
if (root === null) throw new Error("missing #board");

const seed = makeGame(
  snake([[2, 0], [1, 0], [0, 0]]),
  makeBoard(10, 10),
  direction("Right"),
  tick(0, 200),
);

function paint(text: readonly (readonly string[])[]): void {
  root.replaceChildren();
  for (const row of text) {
    for (const cell of row) {
      const node = document.createElement("div");
      node.className = "cell";
      node.textContent = cell;
      root.append(node);
    }
  }
}

arrowKeys().pipe(
  scan((current, pressed) => press(current, pressed.key).game, seed),
  startWith(seed),
  tap((current) => paint(boardText(current, current.board))),
).subscribe();
