/**
 * Keypress — the Feature 1 entity, as a value.
 *
 * The key is stored. The direction it asks for is the same name.
 */

import type { Way } from "./direction.ts";

export type ArrowKey = "Up" | "Down" | "Left" | "Right";

export type Keypress = {
  readonly key: ArrowKey;
};

export function keypress(key: ArrowKey): Keypress {
  return { key };
}

export function asked(keypress: Keypress): Way {
  return keypress.key;
}
