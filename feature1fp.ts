/**
 * Feature 1 as a stream.
 *
 * feature1.ts stays the pure transitions. This file only composes them:
 * a keypress event calls press, a tick event calls passTick, and scan
 * folds the events onto the seed game. Nothing here mutates the game.
 */

import { interval, merge, type Observable } from "rxjs";
import { map, scan, startWith } from "rxjs";
import type { ArrowKey } from "./keypress.ts";
import type { Game } from "./game.ts";
import { passTick, press } from "./feature1.ts";

export type Feature1Event =
  | { readonly type: "key"; readonly key: ArrowKey }
  | { readonly type: "tick" };

export function reduceFeature1(game: Game, event: Feature1Event): Game {
  if (event.type === "tick") return passTick(game);
  return press(game, event.key).game;
}

/** Keys and ticks are injected, so the reduction does not own the clock. */
export function feature1(
  seed: Game,
  keys: Observable<ArrowKey>,
  ticks: Observable<unknown>,
): Observable<Game> {
  const keyEvents = keys.pipe(map((key): Feature1Event => ({ type: "key", key })));
  const tickEvents = ticks.pipe(map((): Feature1Event => ({ type: "tick" })));
  return merge(keyEvents, tickEvents).pipe(scan(reduceFeature1, seed), startWith(seed));
}

/** Same reduction, with the tick interval taken from the seed game. */
export function feature1Interval(seed: Game, keys: Observable<ArrowKey>): Observable<Game> {
  return feature1(seed, keys, interval(seed.tick.interval));
}
