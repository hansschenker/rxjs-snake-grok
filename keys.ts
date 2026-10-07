/**
 * Arrow keys as a stream of Keypress values.
 * The page must not scroll when an arrow key is pressed.
 */

import { fromEvent, type Observable } from "rxjs";
import { filter, map, tap } from "rxjs";
import { keypress, type ArrowKey, type Keypress } from "./keypress.ts";

const arrows: Record<string, ArrowKey> = {
  ArrowLeft: "Left",
  ArrowRight: "Right",
  ArrowUp: "Up",
  ArrowDown: "Down",
};

export function arrowKeys(target: EventTarget = document): Observable<Keypress> {
  return fromEvent<KeyboardEvent>(target, "keydown").pipe(
    filter((event) => event.key in arrows),
    tap((event) => event.preventDefault()),
    map((event) => keypress(arrows[event.key])),
  );
}
