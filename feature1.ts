/**
 * Feature 1 transitions. A keypress never moves the snake.
 * A tick is the only event that moves it.
 *
 * F1-5 rejects the opposite of the effective direction.
 * F1-6 accepts the effective direction and leaves pending empty.
 * Any other keypress becomes the only pending direction.
 */

import type { Cell } from "./board.ts";
import { effective, opposite, direction, type Way } from "./direction.ts";
import type { Game } from "./game.ts";
import { asked, keypress, type ArrowKey } from "./keypress.ts";
import { head, snake } from "./snake.ts";
import { tick } from "./tick.ts";

const step: Record<Way, Cell> = {
  Right: [1, 0],
  Left: [-1, 0],
  Up: [0, -1],
  Down: [0, 1],
};

export type Press = {
  readonly accepted: boolean;
  readonly game: Game;
};

export function press(game: Game, key: ArrowKey): Press {
  const want = asked(keypress(key));
  const current = effective(game.direction);
  const recorded = keypress(key);

  if (want === opposite[current]) {
    return { accepted: false, game: { ...game, lastKeypress: recorded } };
  }
  if (want === current) {
    return {
      accepted: true,
      game: { ...game, lastKeypress: recorded, direction: direction(game.direction.facing, null) },
    };
  }
  return {
    accepted: true,
    game: { ...game, lastKeypress: recorded, direction: direction(game.direction.facing, want) },
  };
}

export function passTick(game: Game): Game {
  const way = effective(game.direction);
  const [x, y] = head(game.snake);
  const [dx, dy] = step[way];
  const segments = [[x + dx, y + dy] as Cell, ...game.snake.segments.slice(0, -1)];
  return {
    ...game,
    snake: snake(segments),
    direction: direction(way, null),
    tick: tick(game.tick.count + 1, game.tick.interval),
  };
}
