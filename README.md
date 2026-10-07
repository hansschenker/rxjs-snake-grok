# rxjs-snake-grok

A Snake game designed and written in functional TypeScript with RxJS. Values instead of classes. A keypress never moves the snake. A tick is the only event that moves it.

The main contributor to this project is SuperGrok.

## This branch

`board-and-snake` is the start of the project. It holds Feature 1 only: the board, the snake, and movement. Food, walls, and self-collision are later features.

## Feature 1 files

- `board.ts` — width and height. Cells and unit are derived.
- `snake.ts` — segments. Length, head, tail, and path are derived.
- `direction.ts` — facing and pending. Effective is pending if set, otherwise facing.
- `keypress.ts` — the arrow key pressed.
- `tick.ts` — count and interval.
- `game.ts` — the running game.
- `feature1.ts` — the pure transitions, `press` and `passTick`.
- `feature1fp.ts` — the RxJS composition. Key and tick streams are folded onto the seed game with `scan`.

## Movement rules

- A tick moves the head one cell in the effective direction and drops the tail.
- A keypress is queued as pending and applied on the next tick.
- The last accepted keypress before a tick wins.
- A keypress that reverses the effective direction is rejected.
- Pressing the effective direction leaves pending empty.
