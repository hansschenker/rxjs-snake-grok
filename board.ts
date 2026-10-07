/**
 * Board — the Feature 1 entity, as a value.
 *
 * Stored attributes are width and height. Cells and unit are functions of
 * those two, so they cannot drift from the bounds.
 */

export type Cell = readonly [x: number, y: number];

export type Board = {
  readonly width: number;
  readonly height: number;
};

/** One move is one cell. The unit is the same for every board. */
export const unit: Cell = [1, 1];

export function board(width: number, height: number): Board {
  if (!Number.isInteger(width) || width < 1) {
    throw new Error("width must be an integer >= 1");
  }
  if (!Number.isInteger(height) || height < 1) {
    throw new Error("height must be an integer >= 1");
  }
  return { width, height };
}

/** Every coordinate inside the bounds, row by row. */
export function cells(board: Board): readonly Cell[] {
  const out: Cell[] = [];
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      out.push([x, y]);
    }
  }
  return out;
}

export function contains(board: Board, [x, y]: Cell): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < board.width && y < board.height;
}
